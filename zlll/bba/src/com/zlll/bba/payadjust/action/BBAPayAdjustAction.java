package com.zlll.bba.payadjust.action;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.bcommon.common.IfmisJsonUtils;
import gov.mof.fasp.ifmis.common.WebUtils;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.framework.util.PaginationDTO;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.zlll.bba.base.action.BBABaseAction;
import com.zlll.bba.base.dto.BBABaseDTO;
import com.zlll.bba.payadjust.dto.BBAPayAdjustDTO;
import com.zlll.bba.payadjust.dto.BBAPayAdjustSubDTO;

public class BBAPayAdjustAction extends BBABaseAction {
	protected void setBpoBeanID() {
		this.bpoBeanID = "bba.payadjust.bpo.BBAPayAdjustBPOTx";
	}

	protected PaginationDTO findSources(HttpServletRequest request)
			throws AppException {
		String whereSql = conditions(request);
		Integer menuid = new Integer(request.getParameter("submenu"));
		PaginationDTO page = new PaginationDTO();
		page = setPage(request);
		page = this.bbaBaseBPO.findSources(menuid.intValue(), whereSql, "",
				page);
		return page;
	}

	protected String query(HttpServletRequest request,
			HttpServletResponse response, PaginationDTO page) throws Exception {
		Integer menuid = new Integer(request.getParameter("submenu"));
		String conditions = conditions(request);
		String wfstatus = request.getParameter("wfstat");
		if ((conditions != null) && (!conditions.equals(""))) {
			if ((wfstatus != null) && (!"".equals(wfstatus))) {
				conditions = conditions + " and wfstatus = " + wfstatus;
			}
		} else if ((wfstatus != null) && (!"".equals(wfstatus))) {
			conditions = " wfstatus = " + wfstatus;
		}

		List liststep = (List) request.getAttribute("wfstepidList");
		List querylist = new ArrayList();
		page = this.bbaBaseBPO.findVous(menuid.intValue(), querylist, liststep,
				page, conditions, "createtime desc ,billid ");
		if (page == null) {
			return "";
		}
		List result = page.getResult();

		List list = appendMainVouchExplain(request, result);
		for (int index = 0; index < result.size(); ++index) {
			BBAPayAdjustDTO mainDTO = (BBAPayAdjustDTO) result.get(index);
			List mainList = new ArrayList();
			List oldList = new ArrayList();
			List newList = new ArrayList();
			for (Iterator it = mainDTO.getDetails().iterator(); it.hasNext();) {
				BBAPayAdjustSubDTO subDTO = (BBAPayAdjustSubDTO) it.next();
				if (subDTO.getDc() == 1) {
					subDTO.setText02("³å");
					oldList.add(subDTO);
				}
				if (subDTO.getDc() == -1) {
					subDTO.setText02("Õý");
					newList.add(subDTO);
				}
			}
			mainList.add(oldList.get(0));
			mainList.add(newList.get(0));

			((Map) list.get(index)).put("details", this.voucherUtil
					.appendDetailVouchExplain(request, mainList));
		}
		page.setResult(list);
		String json = IfmisJsonUtils.ObjectToJson(list);
		return json;
	}

	public ActionForward modifyAction(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		beforeActionHandler("modAction", mapping, form, request, response);
		String selectedbillids = request.getParameter("selectedbillids");

		VouDTO mainDTO = findMainVou4Modify(selectedbillids);
		List detailList = new ArrayList();
		detailList.add(mainDTO);
		BBABaseDTO baseDTO = (BBABaseDTO) mainDTO;

		StringBuffer whereSql = new StringBuffer(" 1 = 1 ");
		int budgetagency = baseDTO.getBudgetagency();
		int budgetproj = baseDTO.getBudgetproj();
		int budgetsource = baseDTO.getBudgetsource();
		String element01 = "0,1,3";
		String accountname = baseDTO.getAccountname();
		String accountno = baseDTO.getAccountno();
		String curamt = request.getParameter("curamt");
		if (budgetagency > 0) {
			whereSql.append(" and budgetagency=").append(budgetagency);
		}
		if (budgetproj > 0) {
			whereSql.append(" and budgetproj=").append(budgetproj);
		}
		if (budgetsource > 0) {
			whereSql.append(" and budgetsource=").append(budgetsource);
		}
		if ((element01 != null) && (element01.trim().length() > 0)) {
			whereSql.append(" and element01 in (").append(element01)
					.append(")");
		}
		if ((accountname != null) && (accountname.trim().length() > 0)) {
			whereSql.append(" and accountname='").append(accountname)
					.append("'");
		}
		if ((accountno != null) && (accountno.trim().length() > 0)) {
			whereSql.append(" and accountno='").append(accountno).append("'");
		}
		if ((curamt != null) && (curamt.trim().length() > 0)) {
			whereSql.append(" and curamt >=").append(curamt);
		}
		List secDetailList = this.bbaBaseBPO.findCtrl(whereSql.toString());

		List sources = findSources4Modify(mainDTO);

		setRequestAttributeToJsp(sources, mainDTO, detailList, request);

		setRequestAttributeToJsp(secDetailList, request);

		WebUtils.clearBrowerCache(response);
		return mapping.findForward("success");
	}
}