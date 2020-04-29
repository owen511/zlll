package com.zlll.bba.plan.dao;

import gov.mof.fasp.AppException;
import gov.mof.framework.util.PaginationDTO;
import java.util.List;
import java.util.Map;

public abstract interface IBBAPlanDAO {
	public abstract PaginationDTO findBankReceiveData(
			PaginationDTO paramPaginationDTO, String paramString)
			throws AppException;

	public abstract List findBankSendData() throws AppException;

	public abstract PaginationDTO findBankSendData(
			PaginationDTO paramPaginationDTO, String paramString)
			throws AppException;

	public abstract void generateComData(List paramList) throws AppException;

	public abstract List findBankSendData(String paramString)
			throws AppException;

	public abstract Map deleteGenerateData(String paramString)
			throws AppException;
}