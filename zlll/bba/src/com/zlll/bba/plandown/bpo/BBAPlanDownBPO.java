package com.zlll.bba.plandown.bpo;

import com.zlll.bba.plan.bpo.BBAPlanBPO;
import com.zlll.bba.plandown.bo.IBBAPlanDownBO;

public class BBAPlanDownBPO extends BBAPlanBPO implements IBBAPlanDownBPO {
	private IBBAPlanDownBO bbaPlanDownBO;

	public IBBAPlanDownBO getBbaPlanDownBO() {
		return this.bbaPlanDownBO;
	}

	public void setBbaPlanDownBO(IBBAPlanDownBO bbaPlanDownBO) {
		this.bbaPlanDownBO = bbaPlanDownBO;
	}
}