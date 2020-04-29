package com.zlll.bba.planadjust.dto;

import com.zlll.bba.plan.dto.BBAPlanDTO;

public class BBAPlanAdjustSubDTO extends BBAPlanDTO {
	private static final long serialVersionUID = -2464272132520434628L;
	private int dc;

	public int getDc() {
		return this.dc;
	}

	public void setDc(int dc) {
		this.dc = dc;
	}
}