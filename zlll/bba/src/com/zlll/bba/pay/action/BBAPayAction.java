package com.zlll.bba.pay.action;

import com.zlll.bba.base.action.BBABaseAction;
import com.zlll.bba.pay.bpo.IBBAPayBPO;
import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.ServiceFactory;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import java.util.ArrayList;
import java.util.List;

public class BBAPayAction extends BBABaseAction {
	IBBAPayBPO payBPO = (IBBAPayBPO) ServiceFactory.getBean(this.bpoBeanID);

	protected void setBpoBeanID() {
		this.bpoBeanID = "bba.pay.bpo.BBAPayBPOTx";
	}

	protected List findDetails4Modify(VouDTO mainDTO) throws AppException {
		List list = new ArrayList();
		list.add(mainDTO);
		return list;
	}
}