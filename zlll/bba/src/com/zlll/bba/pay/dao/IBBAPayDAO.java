package com.zlll.bba.pay.dao;

import com.zlll.bba.pay.dto.BBAPaySubDTO;
import gov.mof.fasp.AppException;
import java.math.BigDecimal;
import java.util.List;

public abstract interface IBBAPayDAO {
	public abstract List findPaySubList(String paramString) throws AppException;

	public abstract void updatePayInfo(String[] paramArrayOfString,
			BigDecimal[] paramArrayOfBigDecimal, String paramString,
			boolean paramBoolean) throws AppException;

	public abstract void deletePaySub(String paramString) throws AppException;

	public abstract void insertPaySub(BBAPaySubDTO paramBBAPaySubDTO,
			boolean paramBoolean) throws AppException;

	public abstract void updatePaySub(BBAPaySubDTO paramBBAPaySubDTO,
			boolean paramBoolean) throws AppException;
}