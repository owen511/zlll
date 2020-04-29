package com.zlll.bba.plandown.action;

import com.zlll.bba.base.action.BBABaseAction;
import com.zlll.bba.plandown.bpo.IBBAPlanDownBPO;
import gov.mof.fasp.ifmis.common.ServiceFactory;

public class BBAPlanDownAction extends BBABaseAction {
	IBBAPlanDownBPO planDownBPO = (IBBAPlanDownBPO) ServiceFactory
			.getBean(this.bpoBeanID);

	protected void setBpoBeanID() {
		this.bpoBeanID = "bba.plandown.bpo.BBAPlanDownBPOTx";
	}
}