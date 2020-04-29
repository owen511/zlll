package com.zlll.bba.plan.bo;

import gov.mof.fasp.AppException;
import gov.mof.framework.util.PaginationDTO;
import java.util.List;
import java.util.Map;

public abstract interface IBBAPlanBO {
	public abstract PaginationDTO findBankReceiveData(
			PaginationDTO paramPaginationDTO, int paramInt, String paramString)
			throws AppException;

	public abstract List findBankSendData() throws AppException;

	public abstract PaginationDTO findBankSendData(
			PaginationDTO paramPaginationDTO, int paramInt, String paramString)
			throws AppException;

	public abstract void generateComData(List paramList) throws AppException;

	public abstract void generateNoComData(List paramList) throws AppException;

	public abstract List findBankSendData(String paramString)
			throws AppException;

	public abstract Map deleteGenerateData(String paramString)
			throws AppException;
}