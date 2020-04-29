package com.zlll.bba.pay.bpo;

import com.zlll.bba.base.bpo.BBABaseBPO;
import com.zlll.bba.pay.bo.IBBAPayBO;

public class BBAPayBPO extends BBABaseBPO implements IBBAPayBPO {
	private IBBAPayBO bbaPayBO;

	public IBBAPayBO getBbaPayBO() {
		return this.bbaPayBO;
	}

	public void setBbaPayBO(IBBAPayBO bbaPayBO) {
		this.bbaPayBO = bbaPayBO;
	}
}