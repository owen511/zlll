package com.zlll.bba.payadjust.dto;

import com.zlll.bba.base.dto.BBABaseDTO;
import com.zlll.bba.pay.dto.BBAPayDTO;
import java.util.ArrayList;
import java.util.List;

public class BBAPayAdjustDTO extends BBAPayDTO {
	private static final long serialVersionUID = -4775352034741909015L;
	private String frombillcode;
	private String tobillcode;
	private List subDetails = new ArrayList();

	public String getFrombillcode() {
		return this.frombillcode;
	}

	public void setFrombillcode(String frombillcode) {
		this.frombillcode = frombillcode;
	}

	public String getTobillcode() {
		return this.tobillcode;
	}

	public void setTobillcode(String tobillcode) {
		this.tobillcode = tobillcode;
	}

	public List getSubDetails() {
		return this.subDetails;
	}

	public void setSubDetails(List subDetails) {
		this.subDetails = subDetails;
	}

	public void copyTo(BBABaseDTO target) {
		super.copyTo(target);
		((BBAPayAdjustDTO) target).frombillcode = this.frombillcode;
		((BBAPayAdjustDTO) target).tobillcode = this.tobillcode;
	}
}