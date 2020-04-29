package com.zlll.bba.base.bpo;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.framework.util.PaginationDTO;
import java.util.List;

public abstract interface IBBABaseBPO {
	public static final String SORT_CONDITION_DEFALT = "createtime desc ,billid ";

	public abstract PaginationDTO findVous(int paramInt, List paramList1,
			List paramList2, PaginationDTO paramPaginationDTO,
			String paramString1, String paramString2) throws AppException;

	public abstract PaginationDTO findSources(int paramInt,
			String paramString1, String paramString2,
			PaginationDTO paramPaginationDTO) throws AppException;

	public abstract VouDTO instanceMainDTO() throws AppException;

	public abstract VouDTO instanceSubDTO() throws AppException;

	public abstract List findVous(String paramString) throws AppException;

	public abstract List findDetails(VouDTO paramVouDTO) throws AppException;

	public abstract List findSource(VouDTO paramVouDTO) throws AppException;

	public abstract List findCtrl(String paramString) throws AppException;

	public abstract List showGatherAccountNo(String paramString)
			throws AppException;

	public abstract List findCtrl(String paramString1, String paramString2)
			throws AppException;
}