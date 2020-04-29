package com.zlll.bba.planadjust.bpo;

import com.zlll.bba.plan.bpo.BBAPlanBPO;
import com.zlll.bba.planadjust.bo.IBBAPlanAdjustBO;
import com.zlll.bba.planadjust.dto.BBAPlanAdjustDTO;
import gov.mof.fasp.AppException;
import java.util.List;

public class BBAPlanAdjustBPO extends BBAPlanBPO implements IBBAPlanAdjustBPO {
	private IBBAPlanAdjustBO bbaPlanAdjustBO;

	public IBBAPlanAdjustBO getBbaPlanAdjustBO() {
		return this.bbaPlanAdjustBO;
	}

	public void setBbaPlanAdjustBO(IBBAPlanAdjustBO bbaPlanAdjustBO) {
		this.bbaPlanAdjustBO = bbaPlanAdjustBO;
	}

	public List findToData(BBAPlanAdjustDTO adjustDTO) throws AppException {
		return this.bbaPlanAdjustBO.findToData(adjustDTO);
	}

	public List findFromData(BBAPlanAdjustDTO adjustDTO) throws AppException {
		return this.bbaPlanAdjustBO.findFromData(adjustDTO);
	}
}