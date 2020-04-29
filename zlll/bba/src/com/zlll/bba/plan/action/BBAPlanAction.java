package com.zlll.bba.plan.action;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.bcommon.common.IfmisJsonUtils;
import gov.mof.fasp.ifmis.common.ServiceFactory;
import gov.mof.fasp.ifmis.common.WebUtils;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.framework.util.PaginationDTO;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONArray;
import org.json.JSONObject;

import com.zlll.bba.base.action.BBABaseAction;
import com.zlll.bba.plan.bpo.IBBAPlanBPO;

public class BBAPlanAction extends BBABaseAction {
	IBBAPlanBPO planBPO = (IBBAPlanBPO) ServiceFactory.getBean(this.bpoBeanID);

	protected void setBpoBeanID() {
		this.bpoBeanID = "bba.plan.bpo.BBAPlanBPOTx";
	}

	public ActionForward modifyAction(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		beforeActionHandler("modAction", mapping, form, request, response);
		String selectedbillids = request.getParameter("selectedbillids");

		VouDTO mainDTO = findMainVou4Modify(selectedbillids);
		List detailList = new ArrayList();
		detailList.add(mainDTO);

		List sources = findSources4Modify(mainDTO);

		setRequestAttributeToJsp(sources, mainDTO, detailList, request);

		WebUtils.clearBrowerCache(response);
		return mapping.findForward("success");
	}

	public ActionForward generateIndexAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String conditions = conditions(request);
		int menuid = Integer.parseInt(request.getParameter("submenu"));
		PaginationDTO page = setPage(request);
		page = this.planBPO.findBankReceiveData(page, menuid, conditions);
		List result = page.getResult();
		List list = appendMainVouchExplain(request, result);
		for (int index = 0; index < result.size(); ++index) {
			VouDTO mainDTO = (VouDTO) result.get(index);
			String whereSql = " billcode ='" + mainDTO.getBillcode() + "'";
			List subList = this.planBPO.findBankSendData(whereSql);

			((Map) list.get(index)).put("details",
					appendExplain(request, "DetailList", subList));
		}
		page.setResult(list);
		String json = IfmisJsonUtils.ObjectToJson(list);
		if (json == "") {
			json = "[]";
		}
		request.setAttribute("json", json);
		WebUtils.clearBrowerCache(response);
		return getNewForward(mapping, request);
	}

	public ActionForward generateAddAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String conditions = conditions(request);
		int menuid = Integer.parseInt(request.getParameter("submenu"));
		PaginationDTO page = new PaginationDTO();
		page = setPage(request);

		page = this.planBPO.findBankSendData(page, menuid, conditions);
		List sourceList;
		if (page == null)
			sourceList = new ArrayList();
		else {
			sourceList = page.getResult();
		}
		VouDTO mainDTO = null;
		setRequestAttributeToJsp(sourceList, mainDTO, null, request);
		WebUtils.clearBrowerCache(response);
		return getNewForward(mapping, request);
	}

	public ActionForward ajaxGenerateAddSaveAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String isCom = request.getParameter("isCom");
		JSONObject json = new JSONObject();
		try {
			List mainList = getVoucher(request);
			if (isCom.equals("1")) {
				this.planBPO.generateComData(mainList);
			} else {
				this.planBPO.generateNoComData(mainList);
			}
			json.put("statuCode", "200");
			json.put("warnmsg", "");
		} catch (AppException app) {
			json.put("statuCode", "100");
			json.put("warnmsg", "保存失败:" + app.getMessage());
			app.printStackTrace();
		}
		request.setAttribute("json", json);
		WebUtils.clearBrowerCache(response);
		return mapping.findForward("success");
	}

	public ActionForward generateDeleteAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Type", "application/json;charset=GBK");
		PrintWriter pw = response.getWriter();
		JSONObject json = new JSONObject();
		String billcodes = request.getParameter("selectedbillids");
		String whereSql = " billcode in (" + billcodes + ")";
		try {
			Map map = this.planBPO.deleteGenerateData(whereSql);
			json.put("statuCode", 200);
			json.put("warnmsg", map.get("warnmsg"));
		} catch (AppException app) {
			json.put("statuCode", 100);
			json.put("warnmsg", app.getMessage());
		}
		pw.print(json.toString());
		WebUtils.clearBrowerCache(response);
		return getNewForward(mapping, request);
	}

	public ActionForward findAccountAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Type", "application/json;charset=GBK");
		PrintWriter pw = response.getWriter();
		JSONObject json = new JSONObject();
		JSONArray fromDcJsonArr = new JSONArray();
		JSONArray toDcObjJsonArr = new JSONArray();
		String elementcode = "bbaaccount";
		String dctype = request.getParameter("dctype");
		String warnMsg = "";

		String whereSql = "dc=1 and dctype = " + dctype;
		List fromList = this.dictionaryService.findElementCodeByElement(
				elementcode, whereSql);
		if (!fromList.isEmpty()) {
			Map map = (Map) fromList.get(0);
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("itemid", map.get("itemid"));
			jsonObj.put("code", map.get("code"));
			jsonObj.put("name", map.get("name"));
			fromDcJsonArr.put(jsonObj);
			json.put("fromDcObj", fromDcJsonArr);
		} else {
			warnMsg = "借方科目设置错误，请联系管理员！\n";
			json.put("errObj", warnMsg);
		}

		whereSql = "dc<>1 and dctype = " + dctype;
		List toList = this.dictionaryService.findElementCodeByElement(
				elementcode, whereSql);
		if (!toList.isEmpty()) {
			Map map = (Map) toList.get(0);
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("itemid", map.get("itemid"));
			jsonObj.put("code", map.get("code"));
			jsonObj.put("name", map.get("name"));
			toDcObjJsonArr.put(jsonObj);
			json.put("toDcObj", toDcObjJsonArr);
		} else {
			json.put("errObj", warnMsg + "贷方科目设置错误，请联系管理员！");
		}
		pw.print(json.toString());
		return null;
	}
}