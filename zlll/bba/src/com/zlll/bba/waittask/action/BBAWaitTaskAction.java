package com.zlll.bba.waittask.action;

import common.Logger;
import gov.mof.fasp.ca.menu.MenuDTO;
import gov.mof.fasp.ifmis.struts.action.BaseAction;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class BBAWaitTaskAction extends BaseAction {
	private Logger logger = Logger.getLogger(BBAWaitTaskAction.class);

	public ActionForward showWaitTaskAction(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			List menus = (List) request.getSession().getAttribute("usermenu");
			List waitMenus = null;
			if (menus != null) {
				waitMenus = new ArrayList();
				for (Iterator it = menus.iterator(); it.hasNext();) {
					MenuDTO menuDTO = (MenuDTO) it.next();
					String menuid = menuDTO.getMenuid() + "";
					if (menuid.startsWith("900")) {
						waitMenus.add(menuDTO);
					}
				}
			}
		} catch (RuntimeException localRuntimeException) {
		}
		return mapping.findForward("success");
	}
}