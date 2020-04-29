package com.zlll.bba.payadjust.dao;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import java.util.List;

public abstract interface IBBAPayAdjustDAO {
	public abstract String getDetailTableName();

	public abstract String getSubDetailTableName();

	public abstract void insertSubDetails(VouDTO paramVouDTO, List paramList)
			throws AppException;
}