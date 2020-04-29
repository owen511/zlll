package com.zlll.bba.pay.dto;

import com.zlll.bba.base.dto.BBABaseDTO;

public class BBAPayDTO extends BBABaseDTO {
	private static final long serialVersionUID = 2794384628081713815L;
	private String skaccountname;
	private String skaccountno;
	private int payclass;
	private int isinterbank;
	private String exstatus;

	public void copyTo(BBABaseDTO target) {
		super.copyTo(target);
		((BBAPayDTO) target).skaccountname = this.skaccountname;
		((BBAPayDTO) target).skaccountno = this.skaccountno;
		((BBAPayDTO) target).payclass = this.payclass;
		((BBAPayDTO) target).isinterbank = this.isinterbank;
	}

	public String getSkaccountname() {
		return this.skaccountname;
	}

	public void setSkaccountname(String skaccountname) {
		this.skaccountname = skaccountname;
	}

	public String getSkaccountno() {
		return this.skaccountno;
	}

	public void setSkaccountno(String skaccountno) {
		this.skaccountno = skaccountno;
	}

	public int getPayclass() {
		return this.payclass;
	}

	public void setPayclass(int payclass) {
		this.payclass = payclass;
	}

	public int getIsinterbank() {
		return this.isinterbank;
	}

	public void setIsinterbank(int isinterbank) {
		this.isinterbank = isinterbank;
	}

	public String getExstatus() {
		return this.exstatus;
	}

	public void setExstatus(String exstatus) {
		this.exstatus = exstatus;
	}
}