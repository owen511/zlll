package com.zlll.bba.payadjust.bpo;

import com.zlll.bba.base.bpo.BBABaseBPO;
import com.zlll.bba.payadjust.bo.IBBAPayAdjustBO;

public class BBAPayAdjustBPO extends BBABaseBPO implements IBBAPayAdjustBPO {
	private IBBAPayAdjustBO bbaPayAdjustBO;

	public IBBAPayAdjustBO getBbaPayAdjustBO() {
		return this.bbaPayAdjustBO;
	}

	public void setBbaPayAdjustBO(IBBAPayAdjustBO bbaPayAdjustBO) {
		this.bbaPayAdjustBO = bbaPayAdjustBO;
	}
}