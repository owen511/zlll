package com.zlll.bba.plan.bpo;

import com.zlll.bba.base.bpo.BBABaseBPO;
import com.zlll.bba.plan.bo.IBBAPlanBO;
import gov.mof.fasp.AppException;
import gov.mof.framework.util.PaginationDTO;
import java.util.List;
import java.util.Map;

public class BBAPlanBPO extends BBABaseBPO implements IBBAPlanBPO {
	private IBBAPlanBO bbaPlanBO;

	public IBBAPlanBO getBbaPlanBO() {
		return this.bbaPlanBO;
	}

	public void setBbaPlanBO(IBBAPlanBO bbaPlanBO) {
		this.bbaPlanBO = bbaPlanBO;
	}

	public PaginationDTO findBankReceiveData(PaginationDTO page, int menuid,
			String whereSql) throws AppException {
		return this.bbaPlanBO.findBankReceiveData(page, menuid, whereSql);
	}

	public List findBankSendData() throws AppException {
		return this.bbaPlanBO.findBankSendData();
	}

	public PaginationDTO findBankSendData(PaginationDTO page, int menuid,
			String whereSql) throws AppException {
		return this.bbaPlanBO.findBankSendData(page, menuid, whereSql);
	}

	public void generateComData(List vouList) throws AppException {
		this.bbaPlanBO.generateComData(vouList);
	}

	public void generateNoComData(List mainList) throws AppException {
		this.bbaPlanBO.generateNoComData(mainList);
	}

	public List findBankSendData(String whereSql) throws AppException {
		return this.bbaPlanBO.findBankSendData(whereSql);
	}

	public Map deleteGenerateData(String whereSql) throws AppException {
		return this.bbaPlanBO.deleteGenerateData(whereSql);
	}
}