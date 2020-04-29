package com.zlll.bba.baseinfo.action;

import com.zlll.bba.base.action.BBABaseAction;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class BBAInfoAction extends BBABaseAction {
	protected void setBpoBeanID() {
		this.bpoBeanID = "bba.baseinfo.bpo.BBAInfoBPOTx";
	}

	public ActionForward findUserMacAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return getNewForward(mapping, request);
	}

	public ActionForward findProjInfoAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return getNewForward(mapping, request);
	}

	public ActionForward findProjCompareAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return getNewForward(mapping, request);
	}
}