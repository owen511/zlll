package com.zlll.bba.planadjust.dto;

import com.zlll.bba.plan.dto.BBAPlanDTO;

public class BBAPlanAdjustDTO extends BBAPlanDTO {
	private static final long serialVersionUID = -9123326778629287357L;
	private int fromctrlid;

	public int getFromctrlid() {
		return this.fromctrlid;
	}

	public void setFromctrlid(int fromctrlid) {
		this.fromctrlid = fromctrlid;
	}
}