package com.zlll.bba.baseinfo.bo;

import com.zlll.bba.base.bo.BBABaseBO;
import com.zlll.bba.baseinfo.dao.IBBAInfoDAO;

public class BBAInfoBO extends BBABaseBO implements IBBAInfoBO {
	private IBBAInfoDAO bbaInfoDAO;

	public IBBAInfoDAO getBbaInfoDAO() {
		return this.bbaInfoDAO;
	}

	public void setBbaInfoDAO(IBBAInfoDAO bbaInfoDAO) {
		this.bbaInfoDAO = bbaInfoDAO;
	}
}