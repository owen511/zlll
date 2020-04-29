package com.zlll.bba.baseinfo.bpo;

import com.zlll.bba.base.bpo.BBABaseBPO;
import com.zlll.bba.baseinfo.bo.IBBAInfoBO;

public class BBAInfoBPO extends BBABaseBPO implements IBBAInfoBPO {
	private IBBAInfoBO bbaInfoBO;

	public IBBAInfoBO getBbaInfoBO() {
		return this.bbaInfoBO;
	}

	public void setBbaInfoBO(IBBAInfoBO bbaInfoBO) {
		this.bbaInfoBO = bbaInfoBO;
	}
}