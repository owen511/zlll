package com.zlll.bba.pay.bo;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.ServiceFactory;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO;
import gov.mof.framework.util.DTOUtil;
import gov.mof.framework.util.PaginationDTO;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.zlll.bba.base.bo.BBABaseBO;
import com.zlll.bba.base.dto.BBABaseDTO;
import com.zlll.bba.pay.dao.IBBAPayDAO;
import com.zlll.bba.pay.dto.BBAPayDTO;
import com.zlll.bba.pay.dto.BBAPaySubDTO;
import com.zlll.bba.remoting.service.IRemotingService;
import com.zlll.bba.remoting.util.ZlllHttpInvokeFactory;

public class BBAPayBO extends BBABaseBO implements IBBAPayBO {
	private IBBAPayDAO bbaPayDAO;
	private ZlllHttpInvokeFactory remoteService = (ZlllHttpInvokeFactory) ServiceFactory
			.getBean("bba.util.remoting.httpInvokeFactory");

	public IBBAPayDAO getBbaPayDAO() {
		return this.bbaPayDAO;
	}

	public void setBbaPayDAO(IBBAPayDAO bbaPayDAO) {
		this.bbaPayDAO = bbaPayDAO;
	}

	public PaginationDTO findSources(PaginationDTO page, String condition,
			String orderBy) throws AppException {
		if (this.sourceDAO != null) {
			String sourceTable = this.sourceDAO.getMainTableName();
			if (this.sourceMainTableName != null) {
				sourceTable = this.sourceMainTableName;
			}
			if (this.hasSub) {
				String subSourceTable = this.sourceDAO.getSubTableName();
				if (this.sourceSubTableName != null) {
					subSourceTable = this.sourceSubTableName;
				}
				page = this.sourceDAO.findVouForMainSub(condition, orderBy,
						sourceTable, this.sourceDAO.getDtoClass(),
						subSourceTable, this.sourceDAO.getSubDtoClass(), page);
			} else {
				page = this.sourceDAO.findVous(sourceTable, page, condition,
						orderBy);
			}
		}
		VoucherTypeDTO vchtypeDTO = this.paService
				.findVchTypeByVchCode("09004");

		List result = this.paService.unitVouchers(page.getResult(),
				vchtypeDTO.getVchtypeid(), vchtypeDTO.getVchtypeid(),
				getDtoClass());

		List mainList = (List) result.get(0);

		List subList = (List) result.get(1);

		Iterator mainIt = mainList.iterator();
		for (Iterator subIt = subList.iterator(); mainIt.hasNext();) {
			BBAPayDTO mainDTO = (BBAPayDTO) mainIt.next();
			List tdedtails = (List) subIt.next();
			BigDecimal sumamt = new BigDecimal("0.00");
			BigDecimal sumCuramt = new BigDecimal("0.00");
			BigDecimal sumEndamt = new BigDecimal("0.00");

			for (Iterator it = tdedtails.iterator(); it.hasNext();) {
				BBAPayDTO subDTO = (BBAPayDTO) it.next();
				sumamt = sumamt.add(subDTO.getAmt());
				sumCuramt = sumCuramt.add(subDTO.getCuramt());
				sumEndamt = sumEndamt.add(subDTO.getEndamt());
			}
			mainDTO.setAmt(sumamt);
			mainDTO.setCuramt(sumCuramt);
			mainDTO.setEndamt(sumEndamt);
		}

		page.setTotalrows(mainList.size());
		page.setResult(mainList);
		return page;
	}

	public List findSource(VouDTO mainDTO) throws AppException {
		PaginationDTO page = new PaginationDTO();
		page.setAllflag(1);
		StringBuffer condition = new StringBuffer();
		condition.append("ctrlid in (");
		condition.append("(select superid from ");
		condition.append("T_BBA_CTRL_WAY_RELATION");
		condition.append(" t1 where exists (select 1 from ").append(
				getSubTableName());
		condition.append(" s1 where s1.billcode = t1.billcode ");
		condition.append(" and s1.mainid =").append(mainDTO.getBillid())
				.append(")))");
		page = findSources(page, condition.toString(), "");
		return page.getResult();
	}

	public void doWayCtrl(VouDTO vouDTO) throws AppException {
		List subList = vouDTO.getDetails();
		getBbaBaseDAO().doSubWayCtrlRelation(subList);
		getBbaBaseDAO().doSubWayCtrl("T_BBA_CTRL", subList);
	}

	public void doUpdateWayCtrl(VouDTO vouDTO) throws AppException {
		doWayCtrl(vouDTO);
	}

	public void doDelCtrl(VouDTO vouDTO) throws AppException {
		List subList = findDatas(getSubTableName(),
				"mainid = " + vouDTO.getBillid(), null, getSubDtoClass());
		getBbaBaseDAO().doDelSubCtrl("T_BBA_CTRL", subList);
		getBbaBaseDAO().doDelSubCtrlRelation(subList);
	}

	public void doEndCtrl(VouDTO vouDTO) throws AppException {
		List subList = findDatas(getSubTableName(),
				"mainid = " + vouDTO.getBillid(), null, getSubDtoClass());

		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBAPaySubDTO subDTO = (BBAPaySubDTO) it.next();
			subDTO.setAccountnode(vouDTO.getAccountnode());
			subDTO.setElement01(2);
		}

		getBbaBaseDAO().doSubEndCtrl("T_BBA_CTRL", subList);

		getBbaBaseDAO().doSubCtrlRelation(subList);

		getBbaBaseDAO().doSubGenerateCtrl("T_BBA_CTRL", subList);
	}

	public List sendRemoteVou(List vouList) throws AppException {
		String isRemote = this.sysSetService.findSystemSetByCode(
				"bba_remote_is").getParamdata();
		if ("0".equals(isRemote)) {
			return vouList;
		}
		List sendVouList = new ArrayList();

		for (Iterator it = vouList.iterator(); it.hasNext();) {
			BBAPayDTO vouDTO = (BBAPayDTO) it.next();
			if (vouDTO.getWfstatus().equals("10")) {
				HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);
				sendVouList.add(hmVou);
			}
		}
		if (sendVouList.isEmpty()) {
			return vouList;
		}
		String remoteAddr = this.sysSetService.findSystemSetByCode(
				"bba_remote_ip").getParamdata();
		String remoteUserName = this.sysSetService.findSystemSetByCode(
				"bba_remote_username").getParamdata();
		String remotePwd = this.sysSetService.findSystemSetByCode(
				"bba_remote_password").getParamdata();
		String remoteYear = this.sysSetService.findSystemSetByCode(
				"bba_remote_year").getParamdata();
		boolean isLoginSuccess = this.remoteService.invokerLogin(remoteAddr,
				remoteUserName, remotePwd, remoteYear);
		if (isLoginSuccess) {
			Object remoteObj = this.remoteService.getIRemoteInterface(
					IRemotingService.class, remoteAddr,
					"/bba/getDataFromRemotingService");
			IRemotingService service = (IRemotingService) remoteObj;
			Map dataMap = new HashMap();
			dataMap.put("dataList", sendVouList);
			dataMap.put("tableName", getMainTableName());
			service.send(dataMap);
		}

		return vouList;
	}

	public void doPreCreate(List vouList) throws AppException {
		String[] fieldarr = getField();

		for (Iterator it = vouList.iterator(); it.hasNext();) {
			BBAPayDTO mainDTO = (BBAPayDTO) it.next();

			StringBuffer sql = new StringBuffer(" 1 = 1 ");
			List params = new ArrayList();
			for (int i = 0; i < fieldarr.length; ++i) {
				sql.append(" and ");
				sql.append(fieldarr[i]).append("=?");
				params.add(getValue(mainDTO, fieldarr[i]));
			}

			sql.append(" and curamt>0 ");
			sql.append(" order by ");
			sql.append("ELEMENT01,LASTUPDATETIME");
			BigDecimal initamt = mainDTO.getAmt();
			mainDTO.setCuramt(initamt);
			mainDTO.setEndamt(initamt);
			List subList = new ArrayList();

			List ctrlList = getBbaBaseDAO().findCtrl(sql.toString(), params);
			for (Iterator subIt = ctrlList.iterator(); subIt.hasNext();) {
				BBAPaySubDTO subDTO = new BBAPaySubDTO();
				mainDTO.copyTo(subDTO);

				subDTO.setVchtypeid(mainDTO.getVchtypeid());
				subDTO.setAccountnode(mainDTO.getAccountnode());
				BBABaseDTO baseDTO = (BBABaseDTO) subIt.next();

				if (baseDTO.getCuramt().compareTo(initamt) >= 0) {
					subDTO.setAmt(initamt);
					subDTO.setCuramt(initamt);
					subDTO.setEndamt(initamt);
					subDTO.setCtrlid(baseDTO.getCtrlid());
					subDTO.setBillcode(null);
					subList.add(subDTO);
					break;
				}
				subDTO.setAmt(baseDTO.getCuramt());
				subDTO.setCuramt(initamt);
				subDTO.setEndamt(initamt);
				subDTO.setCtrlid(baseDTO.getCtrlid());
				subDTO.setBillcode(null);
				subList.add(subDTO);
				initamt = initamt.subtract(baseDTO.getCuramt());
			}

			mainDTO.setDetails(subList);
			getBbaBaseDAO().addGatherAccountNo(mainDTO);
		}
	}

	public void doPreUpdate(List vouList) throws AppException {
		for (Iterator it = vouList.iterator(); it.hasNext();) {
			BBAPayDTO mainDTO = (BBAPayDTO) it.next();
			doDelCtrl(mainDTO);
		}
		doPreCreate(vouList);
	}
}