package com.zlll.bba.plan.bo;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ca.menu.MenuDTO;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO;
import gov.mof.fasp.sec.util.SecureUtil;
import gov.mof.framework.util.PaginationDTO;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.zlll.bba.base.bo.BBABaseBO;
import com.zlll.bba.plan.dao.IBBAPlanDAO;
import com.zlll.bba.plan.dto.BBAPlanDTO;

public class BBAPlanBO extends BBABaseBO implements IBBAPlanBO {
	private IBBAPlanDAO bbaPlanDAO;

	public IBBAPlanDAO getBbaPlanDAO() {
		return this.bbaPlanDAO;
	}

	public void setBbaPlanDAO(IBBAPlanDAO bbaPlanDAO) {
		this.bbaPlanDAO = bbaPlanDAO;
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
				return this.sourceDAO.findVouForMainSub(condition, orderBy,
						sourceTable, this.sourceDAO.getDtoClass(),
						subSourceTable, this.sourceDAO.getSubDtoClass(), page);
			}
			return this.sourceDAO.findVous(sourceTable, page, condition,
					orderBy);
		}

		return page;
	}

	public void doWayCtrl(VouDTO vouDTO) throws AppException {
		getBbaBaseDAO().doWayCtrlRelation(vouDTO);
		getBbaBaseDAO().doWayCtrl(this.sourceMainTableName, vouDTO);
	}

	public void doUpdateWayCtrl(VouDTO vouDTO) throws AppException {
		getBbaBaseDAO().doUpdateWayCtrl(this.sourceMainTableName, vouDTO);
	}

	public void doDelCtrl(VouDTO vouDTO) throws AppException {
		getBbaBaseDAO().doDelCtrl(this.sourceMainTableName, vouDTO);
		getBbaBaseDAO().doDelCtrlRelation(vouDTO);
	}

	public void doEndCtrl(VouDTO vouDTO) throws AppException {
		getBbaBaseDAO().doEndCtrl(this.sourceMainTableName, vouDTO);

		getBbaBaseDAO().doCtrlRelation(vouDTO);

		vouDTO.setElement01(1);

		getBbaBaseDAO().doGenerateCtrl("T_BBA_CTRL", vouDTO);
	}

	public List findSource(VouDTO mainDTO) throws AppException {
		PaginationDTO page = new PaginationDTO();
		page.setAllflag(1);
		StringBuffer condition = new StringBuffer();
		condition.append("ctrlid=");
		condition.append("(select superid from ");
		condition.append("T_BBA_CTRL_WAY_RELATION");
		condition.append(" where billcode='").append(mainDTO.getBillcode())
				.append("')");
		page = findSources(page, condition.toString(), "");
		return page.getResult();
	}

	public PaginationDTO findBankReceiveData(PaginationDTO page, int menuid,
			String whereSql) throws AppException {
		String where = getDataRightSql(menuid, whereSql);
		return this.bbaPlanDAO.findBankReceiveData(page, where);
	}

	private String getDataRightSql(int menuid, String whereSql)
			throws AppException {
		String tableCode = this.sourceDAO.getMainTableName();
		MenuDTO menu = getMenuBPO().findMenubyMenuid(menuid);
		if ((menu != null) && (menu.getTablecode() != null)) {
			tableCode = menu.getTablecode();
		}
		String where = this.appUtil.createAllWhere(menuid, null, whereSql,
				tableCode);
		return where;
	}

	public List findBankSendData() throws AppException {
		return this.bbaPlanDAO.findBankSendData();
	}

	public PaginationDTO findBankSendData(PaginationDTO page, int menuid,
			String whereSql) throws AppException {
		String where = getDataRightSql(menuid, whereSql);
		return this.bbaPlanDAO.findBankSendData(page, where);
	}

	public List findBankSendData(String whereSql) throws AppException {
		return this.bbaPlanDAO.findBankSendData(whereSql);
	}

	public void generateComData(List vouList) throws AppException {
		StringBuffer frombankno = new StringBuffer();
		for (Iterator it = vouList.iterator(); it.hasNext();) {
			BBAPlanDTO planDTO = (BBAPlanDTO) it.next();
			frombankno.append("'").append(planDTO.getFrombankno()).append("'");
			frombankno.append(",");
		}
		frombankno.append("'-0'");

		String whereSql = "frombankno in (" + frombankno.toString() + ")";
		List comLists = this.sourceDAO.comListsByGroupBy("T_BBA_BANK_SEND",
				"sum(amt) as amt", whereSql,
				"ACCOUNTNAME,ACCOUNTNO,BUDGETAGENCY", getDtoClass());
		for (Iterator outerIt = comLists.iterator(); outerIt.hasNext();) {
			BBAPlanDTO planDTO = (BBAPlanDTO) outerIt.next();
			planDTO.setCuramt(planDTO.getAmt());
			planDTO.setEndamt(planDTO.getAmt());
			planDTO.setBillcode(getVchSerialRuleID(planDTO));
			planDTO.setCreatetime(this.sysSetService.findSystemSetByCode(
					"acctdate").getParamdata());
			planDTO.setLastupdatetime(System.currentTimeMillis());
			planDTO.setCreater(SecureUtil.getCurrentUser().getUserid());

			List subList = new ArrayList();
			for (Iterator innerIt = vouList.iterator(); innerIt.hasNext();) {
				BBAPlanDTO subDTO = (BBAPlanDTO) innerIt.next();
				planDTO.setDigest(subDTO.getText05());
				if ((!subDTO.getAccountname().equals(planDTO.getAccountname()))
						|| (!subDTO.getAccountno().equals(
								planDTO.getAccountno()))
						|| (subDTO.getBudgetagency() != planDTO
								.getBudgetagency()))
					continue;
				subDTO.setBillcode(subDTO.getBillcode());
				subList.add(subDTO);
			}

			planDTO.setDetails(subList);
		}
		this.bbaPlanDAO.generateComData(comLists);
	}

	public void generateNoComData(List vouList) throws AppException {
		List mainList = new ArrayList();

		for (Iterator it = vouList.iterator(); it.hasNext();) {
			BBAPlanDTO planDTO = (BBAPlanDTO) it.next();
			BBAPlanDTO subDTO = new BBAPlanDTO();
			planDTO.copyTo(subDTO);
			subDTO.setFrombankno(planDTO.getFrombankno());
			List subList = new ArrayList();
			subList.add(subDTO);
			planDTO.setCuramt(planDTO.getAmt());
			planDTO.setEndamt(planDTO.getAmt());
			planDTO.setBillcode(getVchSerialRuleID(planDTO));
			planDTO.setCreatetime(this.sysSetService.findSystemSetByCode(
					"acctdate").getParamdata());
			planDTO.setLastupdatetime(System.currentTimeMillis());
			planDTO.setCreater(SecureUtil.getCurrentUser().getUserid());
			planDTO.setDetails(subList);
			mainList.add(planDTO);
		}
		this.bbaPlanDAO.generateComData(mainList);
	}

	public String getVchSerialRuleID(BBAPlanDTO planDTO) throws AppException {
		VoucherTypeDTO vchtypeDTO = this.paService
				.findVchTypeByVchCode("09007");
		planDTO.setVchtypeid(vchtypeDTO.getVchtypeid());
		return this.paService.getVchSerialRuleID(planDTO);
	}

	public Map deleteGenerateData(String whereSql) throws AppException {
		return this.bbaPlanDAO.deleteGenerateData(whereSql);
	}
}