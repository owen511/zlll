package com.zlll.bba.base.action;

import gov.mof.fasp.AppException;
import gov.mof.fasp.dic.IDictionaryService;
import gov.mof.fasp.ifmis.bcommon.common.CommonTools;
import gov.mof.fasp.ifmis.bcommon.common.IfmisJsonUtils;
import gov.mof.fasp.ifmis.bcommon.pay.voucher.direct.bo.DirectVouBO;
import gov.mof.fasp.ifmis.common.JsonUtils;
import gov.mof.fasp.ifmis.common.ServiceFactory;
import gov.mof.fasp.ifmis.common.WebUtils;
import gov.mof.fasp.ifmis.common.bo.VoucherUtil;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.fasp.ifmis.struts.action.BaseAction;
import gov.mof.fasp.ifmis.system.configspace.ConfigElement;
import gov.mof.fasp.pa.vchfunction.dto.OperatTypeDTO;
import gov.mof.fasp.sec.util.SecureUtil;
import gov.mof.fasp.wf.work.IWfBPO;
import gov.mof.framework.util.DBUtil;
import gov.mof.framework.util.PaginationDTO;

import java.awt.image.BufferedImage;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.json.JSONObject;

import com.zlll.bba.base.VerifyCode;
import com.zlll.bba.base.bpo.IBBABaseBPO;

public abstract class BBABaseAction extends BaseAction {
	protected IWfBPO wfService = (IWfBPO) ServiceFactory
			.getBean("fasp.wf.WfBPOTx");

	protected IDictionaryService dictionaryService = (IDictionaryService) DBUtil
			.getBeanByName("fasp.dic.dictionaryService");
	protected IBBABaseBPO bbaBaseBPO;
	protected String bpoBeanID;
	protected VoucherUtil voucherUtil = ServiceFactory.getVoucherUtil();

	public IBBABaseBPO getBbaBaseBPO() {
		return this.bbaBaseBPO;
	}

	public void setBbaBaseBPO(IBBABaseBPO bbaBaseBPO) {
		this.bbaBaseBPO = bbaBaseBPO;
	}

	public BBABaseAction() {
		setBpoBeanID();
		setBaseService();
	}

	protected abstract void setBpoBeanID();

	protected void setBaseService() {
		setBbaBaseBPO((IBBABaseBPO) ServiceFactory.getBean(this.bpoBeanID));
	}

	public ActionForward listVoucherAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		processTab(request);
		if (isQueryData(request)) {
			String json = query(request, response);
			if (json == "") {
				json = "[]";
			}
			request.setAttribute("json", json);
			WebUtils.clearBrowerCache(response);
		}
		return getNewForward(mapping, request);
	}

	public ActionForward addAction(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		beforeActionHandler("addAction", mapping, form, request, response);
		if (isQueryData(request)) {
			PaginationDTO page = findSources(request);
			List sourceList;
			if (page == null)
				sourceList = new ArrayList();
			else {
				sourceList = page.getResult();
			}
			VouDTO vouDTO = null;

			setRequestAttributeToJsp(sourceList, vouDTO, null, request);
		}
		WebUtils.clearBrowerCache(response);
		return getNewForward(mapping, request);
	}

	public ActionForward ajaxAddSaveAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		OperatTypeDTO operateTypeDTO = new OperatTypeDTO();
		operateTypeDTO.setOperattype(1);
		JSONObject json = new JSONObject();
		try {
			List mainList = getVoucher(request);
			initVoucher(request, mainList, operateTypeDTO.getOperattype());
			doWfAction(mainList, operateTypeDTO, request);
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

	public ActionForward modifyAction(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		beforeActionHandler("modAction", mapping, form, request, response);
		String selectedbillids = request.getParameter("selectedbillids");

		VouDTO mainDTO = findMainVou4Modify(selectedbillids);
		List detailList = findDetails4Modify(mainDTO);

		List sources = findSources4Modify(mainDTO);

		setRequestAttributeToJsp(sources, mainDTO, detailList, request);

		WebUtils.clearBrowerCache(response);
		return mapping.findForward("success");
	}

	public ActionForward ajaxModifySaveAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		OperatTypeDTO operateTypeDTO = new OperatTypeDTO();
		operateTypeDTO.setOperattype(3);
		JSONObject json = new JSONObject();
		try {
			List mainList = getVoucher(request);
			initVoucher(request, mainList, operateTypeDTO.getOperattype());
			doWfAction(mainList, operateTypeDTO, request);
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

	public ActionForward auditAction(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String operatetype = request.getParameter("operatetype");
		String isCancel = request.getParameter("iscancel");
		String selectedBillids = request.getParameter("selectedbillids");
		String condition = "billid in (" + selectedBillids + ")";
		List result = this.bbaBaseBPO.findVous(condition);

		OperatTypeDTO operateTypeDTO = new OperatTypeDTO();
		if ((operatetype != null) && (!operatetype.equals("")))
			operateTypeDTO.setOperattype(Integer.parseInt(operatetype));
		else {
			operateTypeDTO.setOperattype(7);
		}
		if ((isCancel != null) && ("true".equals(isCancel))) {
			operateTypeDTO.setCancel(true);
		}

		response.setHeader("Content-Type", "application/json;charset=GBK");
		PrintWriter pw = response.getWriter();
		JSONObject json1 = new JSONObject();
		try {
			HashMap wfcs = this.wfService.doAction2(
					operateTypeDTO.getOperattype(), operateTypeDTO.isCancel(),
					SecureUtil.getAuthUser().getAccuserid(), result);
			doResult(request, json1, wfcs);
			doErrorMessage(request, json1, wfcs);
			pw.print(json1.toString());
		} catch (AppException ap) {
			doErrorMessage(ap, json1);
			pw.print(json1.toString());
		}
		pw.flush();
		WebUtils.clearBrowerCache(response);
		return getNewForward(mapping, request);
	}

	public ActionForward auditTabListAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		processTab(request);
		if (isQueryData(request)) {
			PaginationDTO page = setPage(request);
			String json = query(request, response, page);
			request.setAttribute("json", json);
			CommonTools.forWrite(response, IfmisJsonUtils.ObjectToJson(page));
		}
		return null;
	}

	protected String query(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		PaginationDTO page = setPage(request);
		return query(request, response, page);
	}

	public PaginationDTO setPage(HttpServletRequest request) {
		PaginationDTO page = new PaginationDTO();
		if (request.getAttribute("Pagination") == null)
			page.setAllflag(1);
		else {
			page = (PaginationDTO) request.getAttribute("Pagination");
		}
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
			VouDTO details = (VouDTO) result.get(index);

			((Map) list.get(index)).put(
					"details",
					this.voucherUtil.appendDetailVouchExplain(request,
							details.getDetails()));
		}
		page.setResult(list);
		String json = IfmisJsonUtils.ObjectToJson(list);
		return json;
	}

	protected List appendMainVouchExplain(HttpServletRequest request,
			List vouchers) throws AppException {
		List result = this.voucherUtil
				.appendMainVouchExplain(request, vouchers);
		return result;
	}

	protected String conditions(HttpServletRequest request) throws AppException {
		StringBuffer conditions = new StringBuffer("");
		String sql = (String) request.getAttribute("sql_param");
		sql = DirectVouBO.conversionMaxOrMinToSql(sql);
		String defValueSet = (String) request.getAttribute("DEFVALUESET");

		if ((sql != null) && (!"".equals(sql.trim()))) {
			if (conditions.length() > 0) {
				conditions.append(" and ");
			}
			conditions.append(sql.trim());
		}
		if ((defValueSet != null) && (!"".equals(defValueSet.trim()))) {
			if (conditions.length() > 0) {
				conditions.append(" and ");
			}
			conditions.append(defValueSet.trim());
		}
		return conditions.toString();
	}

	protected PaginationDTO findSources(HttpServletRequest request)
			throws AppException {
		String conditions = conditions(request);
		Integer menuid = new Integer(request.getParameter("submenu"));
		PaginationDTO page = new PaginationDTO();
		page = setPage(request);
		page = this.bbaBaseBPO.findSources(menuid.intValue(), conditions, "",
				page);
		return page;
	}

	public ActionForward deleteAction(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String billids = request.getParameter("selectedbillids");
		OperatTypeDTO operateTypeDTO = new OperatTypeDTO();
		operateTypeDTO.setOperattype(2);
		String condition = "billid in (" + billids + ")";
		List vouList = this.bbaBaseBPO.findVous(condition);
		response.setHeader("Content-Type", "application/json;charset=GBK");
		PrintWriter pw = response.getWriter();
		JSONObject json1 = new JSONObject();
		try {
			HashMap wfcs = this.wfService.doAction2(
					operateTypeDTO.getOperattype(), operateTypeDTO.isCancel(),
					SecureUtil.getAuthUser().getAccuserid(), vouList);
			doResult(request, json1, wfcs);
			doErrorMessage(request, json1, wfcs);
			pw.print(json1.toString());
		} catch (AppException ap) {
			doErrorMessage(ap, json1);
			pw.print(json1.toString());
		}
		pw.flush();
		WebUtils.clearBrowerCache(response);
		return getNewForward(mapping, request);
	}

	public ActionForward showGatherAccountNoAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String condition = " 1 = 1";
		String budgetagency = request.getParameter("budgetagency");
		if ((budgetagency != null) && (budgetagency.trim().length() > 0)) {
			condition = condition + " and budgetagency in (" + budgetagency
					+ ")";
		}
		PaginationDTO page = setPage(request);
		List result = this.bbaBaseBPO.showGatherAccountNo(condition);
		page.setTotalrows(result.size());
		result = appendExplain(request, "MainList", result);
		String json = IfmisJsonUtils.ObjectToJson(result);
		request.setAttribute("json", json);
		WebUtils.clearBrowerCache(response);
		return mapping.findForward("success");
	}

	public ActionForward findCtrlAction(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String conditions = conditions(request);
		StringBuffer whereSql = new StringBuffer(" 1 = 1 ");
		StringBuffer whereSql2 = new StringBuffer(" 1 = 1 ");
		String budgetagency = request.getParameter("budgetagency");
		String budgetproj = request.getParameter("budgetproj2");
		String budgetsource = request.getParameter("budgetsource2");
		String budgetfuncclass = request.getParameter("budgetfuncclass2");
		String element01 = request.getParameter("element01");

		String accountno = request.getParameter("accountno");
		String curamt = request.getParameter("curamt");
		if ((budgetagency != null) && (budgetagency.trim().length() > 0)) {
			whereSql.append(" and budgetagency=").append(budgetagency);
			whereSql2.append(" and t1.budgetagency=").append(budgetagency);
		}
		if ((element01 != null) && (element01.trim().length() > 0)) {
			whereSql.append(" and element01 in (").append(element01)
					.append(")");
			whereSql2.append(" and t1.element01 in (").append(element01)
					.append(")");
		}

		if ((accountno != null) && (accountno.trim().length() > 0)) {
			whereSql.append(" and accountno='").append(accountno).append("'");
			whereSql2.append(" and t1.accountno='").append(accountno)
					.append("'");
		}
		if ((curamt != null) && (curamt.trim().length() > 0)) {
			whereSql.append(" and curamt >=").append(curamt);
			whereSql2.append(" and t1.curamt >=").append(curamt);
		}
		if ((budgetproj != null) && (!"undefined".equals(budgetproj))
				&& (budgetproj.trim().length() > 0)) {
			whereSql.append(" and budgetproj in (").append(budgetproj)
					.append(")");
		}
		if ((budgetsource != null) && (!"undefined".equals(budgetsource))
				&& (budgetsource.trim().length() > 0)) {
			whereSql.append(" and budgetsource in (").append(budgetsource)
					.append(")");
		}
		if ((budgetfuncclass != null) && (!"undefined".equals(budgetfuncclass))
				&& (budgetfuncclass.trim().length() > 0)) {
			whereSql.append(" and budgetfuncclass in (")
					.append(budgetfuncclass).append(")");
		}
		if (conditions.length() > 0) {
			conditions = conditions.replaceAll("budgetproj", "t1.budgetproj")
					.replaceAll("budgetsource", "t1.budgetsource")
					.replaceAll("budgetfuncclass", "t1.budgetfuncclass");
			whereSql2.append(" and ").append(conditions);
		}
		PaginationDTO page = setPage(request);
		List list = this.bbaBaseBPO.findCtrl(whereSql.toString(),
				whereSql2.toString());
		page.setTotalrows(list.size());
		list = appendExplain(request, "MainList", list);
		String json = IfmisJsonUtils.ObjectToJson(list);
		request.setAttribute("json", json);
		request.setAttribute("budgetagency", budgetagency);

		request.setAttribute("accountno", accountno);
		request.setAttribute("element01", element01);
		request.setAttribute("curamt", curamt);
		request.setAttribute("budgetproj2", budgetproj);
		request.setAttribute("budgetsource2", budgetsource);
		request.setAttribute("budgetfuncclass2", budgetfuncclass);
		WebUtils.clearBrowerCache(response);
		return mapping.findForward("success");
	}

	protected void setRequestAttributeToJsp(List sourceList, VouDTO mainDTO,
			List detailList, HttpServletRequest request) throws Exception {
		if (sourceList != null) {
			sourceList = appendExplain(request, "MainList", sourceList);
			String sourcejson = JsonUtils.ObjectToJson(sourceList);
			request.setAttribute("sourcesJson", sourcejson);
			request.setAttribute("json", sourcejson);
		} else {
			request.setAttribute("sourcesJson", "null");
			request.setAttribute("json", "null");
		}

		if (detailList != null) {
			detailList = appendExplain(request, "DetailList", detailList);
			String details = JsonUtils.ObjectToJson(detailList);
			request.setAttribute("detailsJson", details);
		} else {
			request.setAttribute("detailsJson", "null");
		}

		if (mainDTO != null) {
			request.setAttribute("mainVouDTO", mainDTO);
			List mainlist = new ArrayList();
			mainDTO.setDetails(null);
			mainlist.add(mainDTO);
			mainlist = appendExplain(request, "", mainlist);
			String mainJson = JsonUtils.ObjectToJson(mainlist);
			request.setAttribute("mainJson", mainJson);
		} else {
			request.setAttribute("mainJson", "null");
		}
	}

	protected void setRequestAttributeToJsp(List secDetailList,
			HttpServletRequest request) throws Exception {
		if (secDetailList != null) {
			secDetailList = appendExplain(request, "SecDetailList",
					secDetailList);
			String details = JsonUtils.ObjectToJson(secDetailList);
			request.setAttribute("secdetailJson", details);
		} else {
			request.setAttribute("secdetailJson", "null");
		}
	}

	protected VouDTO findMainVou4Modify(String selectedbillids)
			throws AppException {
		VouDTO vouDTO = null;
		List vouList = this.bbaBaseBPO.findVous("billid = " + selectedbillids);
		if (vouList.size() > 0) {
			vouDTO = (VouDTO) vouList.get(0);
		}
		return vouDTO;
	}

	protected List findDetails4Modify(VouDTO mainDTO) throws AppException {
		return this.bbaBaseBPO.findDetails(mainDTO);
	}

	protected List findSources4Modify(VouDTO mainDTO) throws AppException {
		return this.bbaBaseBPO.findSource(mainDTO);
	}

	protected List getVoucher(HttpServletRequest request) throws Exception {
		String mainData = request.getParameter("maindata");
		VouDTO vouDTO = instanceMainDTO();
		Object subDTO = instanceSubDTO();
		if (subDTO != null) {
			vouDTO.getDetails().add(subDTO);
		}
		List vouList = new ArrayList();
		vouList.add(vouDTO);
		return (List) JsonUtils.JsonToObject(mainData, vouList);
	}

	protected void initVoucher(HttpServletRequest request, List mainList,
			int operate) throws AppException {
		for (Iterator iterator = mainList.iterator(); iterator.hasNext();) {
			VouDTO vouDTO = (VouDTO) iterator.next();
			vouDTO.setVchtypeid(getVchtypeid(request));
		}
	}

	protected void doWfAction(List mainList, OperatTypeDTO operateTypeDTO,
			HttpServletRequest request) throws AppException {
		HashMap wfcs = this.wfService.doAction2(operateTypeDTO.getOperattype(),
				operateTypeDTO.isCancel(), SecureUtil.getAuthUser()
						.getAccuserid(), mainList);
		if (!((Map) wfcs.get("errorinfo")).isEmpty())
			throw new AppException("0", wfcs.get("errorinfo").toString());
	}

	public int getVchtypeid(HttpServletRequest request) {
		ConfigElement configElement = (ConfigElement) request
				.getAttribute("UIConfigElement");
		return Integer.parseInt(configElement.get("VCHTYPEID").toString());
	}

	protected VouDTO instanceMainDTO() throws AppException {
		return this.bbaBaseBPO.instanceMainDTO();
	}

	protected VouDTO instanceSubDTO() throws AppException {
		return this.bbaBaseBPO.instanceSubDTO();
	}
	
	/**
	 * 生成验证码
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward getVerifyCode(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		int width = 200;
		int height = 69;
		BufferedImage verifyImg = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		// 生成对应宽高的初始图片
		String randomText = VerifyCode.drawRandomText(width, height, verifyImg);
		// 单独的一个类方法，出于代码复用考虑，进行了封装。
		// 功能是生成验证码字符并加上噪点，干扰线，返回值为验证码字符
		request.getSession().setAttribute("verifyCode", randomText);
		response.setContentType("image/png");// 必须设置响应内容类型为图片，否则前台不识别
		OutputStream os = response.getOutputStream(); // 获取文件输出流
		ImageIO.write(verifyImg, "png", os);// 输出图片流
		os.flush();
		os.close();// 关闭流
		return null;
	}
}