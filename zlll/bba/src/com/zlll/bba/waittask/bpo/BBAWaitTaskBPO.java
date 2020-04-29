package com.zlll.bba.waittask.bpo;

import com.zlll.bba.base.bpo.BBABaseBPO;
import com.zlll.bba.waittask.bo.IBBAWaitTaskBO;
import gov.mof.fasp.AppException;
import java.util.List;

public class BBAWaitTaskBPO extends BBABaseBPO implements IBBAWaitTaskBPO {
	private IBBAWaitTaskBO bbaWaitTaskBO;

	public IBBAWaitTaskBO getBbaWaitTaskBO() {
		return this.bbaWaitTaskBO;
	}

	public void setBbaWaitTaskBO(IBBAWaitTaskBO bbaWaitTaskBO) {
		this.bbaWaitTaskBO = bbaWaitTaskBO;
	}

	public List findWaitTask(List waitMenus) throws AppException {
		return this.bbaWaitTaskBO.findWaitTask(waitMenus);
	}

	public List findWaitOperate(List waitMenus) throws AppException {
		return this.bbaWaitTaskBO.findWaitOperate(waitMenus);
	}
}