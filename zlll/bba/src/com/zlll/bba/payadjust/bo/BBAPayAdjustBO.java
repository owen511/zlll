package com.zlll.bba.payadjust.bo;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO;
import gov.mof.framework.util.PaginationDTO;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.zlll.bba.base.bo.BBABaseBO;
import com.zlll.bba.base.dto.BBABaseDTO;
import com.zlll.bba.pay.dao.IBBAPayDAO;
import com.zlll.bba.pay.dto.BBAPaySubDTO;
import com.zlll.bba.payadjust.dao.IBBAPayAdjustDAO;
import com.zlll.bba.payadjust.dto.BBAPayAdjustDTO;
import com.zlll.bba.payadjust.dto.BBAPayAdjustSubDTO;

public class BBAPayAdjustBO extends BBABaseBO implements IBBAPayAdjustBO {
	private IBBAPayAdjustDAO bbaPayAdjustDAO;
	private IBBAPayDAO bbaPayDAO;

	public IBBAPayAdjustDAO getBbaPayAdjustDAO() {
		return this.bbaPayAdjustDAO;
	}

	public void setBbaPayAdjustDAO(IBBAPayAdjustDAO bbaPayAdjustDAO) {
		this.bbaPayAdjustDAO = bbaPayAdjustDAO;
	}

	public IBBAPayDAO getBbaPayDAO() {
		return this.bbaPayDAO;
	}

	public void setBbaPayDAO(IBBAPayDAO bbaPayDAO) {
		this.bbaPayDAO = bbaPayDAO;
	}

	public void doPreCreate(List vouList) throws AppException {
		String[] fieldarr = getField();

		for (Iterator it = vouList.iterator(); it.hasNext();) {
			BBAPayAdjustDTO mainDTO = (BBAPayAdjustDTO) it.next();
			if (mainDTO.getElement04() == 0) {
				continue;
			}

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
			List subList = new ArrayList();

			List ctrlList = getBbaBaseDAO().findCtrl(sql.toString(), params);
			for (Iterator subIt = ctrlList.iterator(); subIt.hasNext();) {
				BBAPayAdjustSubDTO subDTO = new BBAPayAdjustSubDTO();
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

			mainDTO.setSubDetails(subList);
			getBbaBaseDAO().addGatherAccountNo(mainDTO);
		}
	}

	public void doPostCreate(List vouList) throws AppException {
	}

	public void doWayCtrl(VouDTO vouDTO) throws AppException {
		BBAPayAdjustDTO payAdjustDTO = (BBAPayAdjustDTO) vouDTO;
		String[] amtAttrs = { "curamt" };
		BigDecimal[] amtValues = { vouDTO.getAmt() };
		String whereSql = "billcode ='" + payAdjustDTO.getFrombillcode() + "'";
		this.bbaPayDAO.updatePayInfo(amtAttrs, amtValues, whereSql, false);
		if (vouDTO.getElement04() == 0) {
			return;
		}

		List subList = ((BBAPayAdjustDTO) vouDTO).getSubDetails();
		getBbaBaseDAO().doSubWayCtrlRelation(subList);
		getBbaBaseDAO().doSubWayCtrl("T_BBA_CTRL", subList);
	}

	public void doDelCtrl(VouDTO vouDTO) throws AppException {
		BBAPayAdjustDTO payAdjustDTO = (BBAPayAdjustDTO) vouDTO;
		String[] amtAttrs = { "curamt" };
		BigDecimal[] amtValues = { vouDTO.getAmt() };
		String whereSql = "billcode ='" + payAdjustDTO.getFrombillcode() + "'";
		this.bbaPayDAO.updatePayInfo(amtAttrs, amtValues, whereSql, true);
		if (vouDTO.getElement04() == 0) {
			return;
		}

		List subList = findDatas("t_bba_pay_sub",
				"mainid = " + vouDTO.getBillid(), null, getSubDtoClass());
		getBbaBaseDAO().doDelSubCtrl("T_BBA_CTRL", subList);
		getBbaBaseDAO().doDelSubCtrlRelation(subList);
	}

	public void doEndCtrl(VouDTO vouDTO) throws AppException {
		BBAPayAdjustDTO payAdjustDTO = (BBAPayAdjustDTO) vouDTO;

		String subWhereSql = " mainid = " + payAdjustDTO.getBillid()
				+ " and amt<0";
		List adjustBeforeDTO = findDatas(getSubTableName(), subWhereSql, "",
				getSubDtoClass());
		BBAPayAdjustSubDTO adjustSubDTO = (BBAPayAdjustSubDTO) adjustBeforeDTO
				.get(0);
		String[] amtAttrs = { "endamt" };
		BigDecimal[] amtValues = { vouDTO.getAmt() };
		String whereSql = "billcode ='" + payAdjustDTO.getFrombillcode() + "'";
		boolean isCancel = true;
		boolean isRecorvy = false;
		if (vouDTO.getAccountnode().getCode().equals("2")) {
			isCancel = false;
			isRecorvy = true;
		}
		this.bbaPayDAO.updatePayInfo(amtAttrs, amtValues, whereSql, isCancel);

		List oldSubLists = this.bbaPayDAO.findPaySubList(payAdjustDTO
				.getFrombillcode());
		if (vouDTO.getElement04() == 0) {
			for (Iterator oldSubIt = oldSubLists.iterator(); oldSubIt.hasNext();) {
				BBAPaySubDTO oldSubDTO = (BBAPaySubDTO) oldSubIt.next();
				if (isCancel) {
					oldSubDTO.setBudgeteconomicclass(adjustSubDTO
							.getBudgeteconomicclass());
					oldSubDTO.setDigest(adjustSubDTO.getDigest());
				} else {
					oldSubDTO.setBudgeteconomicclass(payAdjustDTO
							.getBudgeteconomicclass());
					oldSubDTO.setDigest(payAdjustDTO.getDigest());
				}

				this.bbaPayDAO.updatePaySub(oldSubDTO, isCancel);

				String[] attrName = { "budgeteconomicclass", "digest" };
				String[] attrValue = { oldSubDTO.getBudgeteconomicclass() + "",
						oldSubDTO.getDigest() };
				getBbaBaseDAO().doUpdateCtrlAttr("T_BBA_CTRL", attrName,
						attrValue, oldSubDTO.getBillcode());
			}
		} else {
			whereSql = "mainid=" + vouDTO.getBillid() + " and vchtypeid = "
					+ vouDTO.getVchtypeid();
			List subList = findDatas(this.bbaPayAdjustDAO.getDetailTableName(),
					whereSql, "", getSubDtoClass());

			for (Iterator it = subList.iterator(); it.hasNext();) {
				BBAPayAdjustSubDTO subDTO = (BBAPayAdjustSubDTO) it.next();
				subDTO.setAccountnode(vouDTO.getAccountnode());
				subDTO.setElement01(2);
			}

			getBbaBaseDAO().doSubEndCtrl("T_BBA_CTRL", subList);

			getBbaBaseDAO().doSubCtrlRelation(subList);

			getBbaBaseDAO().doSubGenerateCtrl("T_BBA_CTRL", subList);

			getBbaBaseDAO().doDelSubCtrl("T_BBA_CTRL", oldSubLists, isRecorvy);

			for (Iterator oldSubIt = oldSubLists.iterator(); oldSubIt.hasNext();) {
				BBAPaySubDTO oldSubDTO = (BBAPaySubDTO) oldSubIt.next();

				List ctrlList = getBbaBaseDAO().findCtrl(
						"billcode = '" + oldSubDTO.getBillcode() + "'", "");
				BBABaseDTO baseDTO = (BBABaseDTO) ctrlList.get(0);
				oldSubDTO.setCtrlid(baseDTO.getCtrlid());
				oldSubDTO.setAccountnode(vouDTO.getAccountnode());
				getBbaBaseDAO().doWayEndCtrl("T_BBA_CTRL", oldSubDTO);

				oldSubDTO.setAmt(oldSubDTO.getAmt().negate());

				oldSubDTO.setBillcode(oldSubDTO.getBillcode() + "-01");
				oldSubDTO.setVchtypeid(vouDTO.getVchtypeid());
				this.bbaPayDAO.insertPaySub(oldSubDTO, isCancel);
			}
		}
	}

	protected void initBcInfo(VouDTO mainDTO) throws AppException {
		List list = mainDTO.getDetails();
		if ((list != null) && (list.size() > 0)) {
			int i = 0;
			for (int loopJ = list.size(); i < loopJ; ++i) {
				BBAPayAdjustSubDTO subDTO = (BBAPayAdjustSubDTO) list.get(i);
				if (subDTO.getDc() == 1) {
					subDTO.setStartamt(mainDTO.getAmt().negate());
					subDTO.setAmt(mainDTO.getAmt().negate());
					list.set(0, subDTO);
				}
				if (subDTO.getDc() == -1) {
					subDTO.setStartamt(mainDTO.getAmt());
					subDTO.setAmt(mainDTO.getAmt());
					list.set(1, subDTO);
				}
			}
		}
		mainDTO.setStartamt(mainDTO.getAmt());
		mainDTO.setDetails(list);
	}

	public List findCtrl(String whereSql, String whereSql2) throws AppException {
		PaginationDTO page = new PaginationDTO();

		StringBuffer tabBuffer = new StringBuffer();
		tabBuffer.append("(select t1.* from ").append("T_BBA_CTRL")
				.append(" t1, ");
		tabBuffer.append("(select * from ").append("T_BBA_CTRL").append(" ");
		tabBuffer.append(" where ").append(whereSql).append(") t2");
		tabBuffer.append(" where ").append(whereSql2);
		tabBuffer.append(" and (t2.budgetproj<>t1.budgetproj");
		tabBuffer.append(" or t2.budgetsource<>t1.budgetsource");
		tabBuffer.append(" or t2.budgetfuncclass<>t1.budgetfuncclass");
		tabBuffer.append("))");

		page = this.sourceDAO.findVous(tabBuffer.toString(), page, "", "");
		VoucherTypeDTO vchtypeDTO = this.paService
				.findVchTypeByVchCode("09004");

		List result = this.paService.unitVouchers(page.getResult(),
				vchtypeDTO.getVchtypeid(), vchtypeDTO.getVchtypeid(),
				getDtoClass());

		List mainList = (List) result.get(0);

		List subList = (List) result.get(1);

		Iterator mainIt = mainList.iterator();
		for (Iterator subIt = subList.iterator(); mainIt.hasNext();) {
			BBAPayAdjustDTO mainDTO = (BBAPayAdjustDTO) mainIt.next();
			List tdedtails = (List) subIt.next();
			BigDecimal sumamt = new BigDecimal("0.00");
			BigDecimal sumCuramt = new BigDecimal("0.00");
			BigDecimal sumEndamt = new BigDecimal("0.00");

			for (Iterator it = tdedtails.iterator(); it.hasNext();) {
				BBAPayAdjustDTO subDTO = (BBAPayAdjustDTO) it.next();
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
		return page.getResult();
	}

	public List findSource(VouDTO mainDTO) throws AppException {
		PaginationDTO page = new PaginationDTO();
		page.setAllflag(1);
		StringBuffer condition = new StringBuffer();
		BBAPayAdjustDTO adjustDTO = (BBAPayAdjustDTO) mainDTO;
		condition.append(" billcode ='").append(adjustDTO.getFrombillcode())
				.append("'");
		page = this.sourceDAO.findVous(this.sourceMainTableName, page,
				condition.toString(), "");
		return page.getResult();
	}

	public void doPreUpdate(List vouList) throws AppException {
		for (Iterator it = vouList.iterator(); it.hasNext();) {
			BBAPayAdjustDTO vouDTO = (BBAPayAdjustDTO) it.next();
			String whereSql = "mainid=" + vouDTO.getBillid()
					+ " and vchtypeid = " + vouDTO.getVchtypeid();
			List subList = findDatas(this.bbaPayAdjustDAO.getDetailTableName(),
					whereSql, "", getSubDtoClass());

			getBbaBaseDAO().doDelSubCtrl("T_BBA_CTRL", subList);

			this.bbaPayDAO.deletePaySub(whereSql);
		}
		doPreCreate(vouList);
	}

	public void doUpdateWayCtrl(VouDTO vouDTO) throws AppException {
		List subList = ((BBAPayAdjustDTO) vouDTO).getSubDetails();
		getBbaBaseDAO().doSubWayCtrlRelation(subList);
		getBbaBaseDAO().doSubWayCtrl("T_BBA_CTRL", subList);
	}

	public List sendVou(List vouList) throws AppException {
		System.out.println(">>>>>>>>>>>>>");
		return new ArrayList();
	}
}