package com.zlll.bba.planadjust.action;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.bcommon.common.IfmisJsonUtils;
import gov.mof.fasp.ifmis.common.ServiceFactory;
import gov.mof.framework.util.PaginationDTO;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zlll.bba.base.action.BBABaseAction;
import com.zlll.bba.planadjust.bpo.IBBAPlanAdjustBPO;
import com.zlll.bba.planadjust.dto.BBAPlanAdjustDTO;
import com.zlll.bba.planadjust.dto.BBAPlanAdjustSubDTO;

public class BBAPlanAdjustAction extends BBABaseAction {
	IBBAPlanAdjustBPO planAdjustBPO = (IBBAPlanAdjustBPO) ServiceFactory
			.getBean(this.bpoBeanID);

	protected void setBpoBeanID() {
		this.bpoBeanID = "bba.planadjust.bpo.BBAPlanAdjustBPOTx";
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
			BBAPlanAdjustDTO mainDTO = (BBAPlanAdjustDTO) result.get(index);
			List mainList = new ArrayList();
			List oldList = new ArrayList();
			List newList = new ArrayList();
			for (Iterator it = mainDTO.getDetails().iterator(); it.hasNext();) {
				BBAPlanAdjustSubDTO subDTO = (BBAPlanAdjustSubDTO) it.next();
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
}