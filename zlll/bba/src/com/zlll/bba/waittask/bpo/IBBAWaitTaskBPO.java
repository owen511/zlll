package com.zlll.bba.waittask.bpo;

import gov.mof.fasp.AppException;
import java.util.List;

public abstract interface IBBAWaitTaskBPO {
	public abstract List findWaitTask(List paramList) throws AppException;

	public abstract List findWaitOperate(List paramList) throws AppException;
}