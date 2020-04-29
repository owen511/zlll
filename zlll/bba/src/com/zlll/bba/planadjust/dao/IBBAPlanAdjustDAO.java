package com.zlll.bba.planadjust.dao;

import com.zlll.bba.planadjust.dto.BBAPlanAdjustDTO;
import gov.mof.fasp.AppException;
import java.util.List;

public abstract interface IBBAPlanAdjustDAO {
	public abstract List findToData(BBAPlanAdjustDTO paramBBAPlanAdjustDTO)
			throws AppException;

	public abstract List findFromData(BBAPlanAdjustDTO paramBBAPlanAdjustDTO)
			throws AppException;
}