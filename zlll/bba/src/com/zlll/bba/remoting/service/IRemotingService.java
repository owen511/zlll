package com.zlll.bba.remoting.service;

import gov.mof.fasp.AppException;
import java.util.List;
import java.util.Map;

public abstract interface IRemotingService {
	public abstract void send(List paramList) throws AppException;

	public abstract Map send(Map paramMap) throws AppException;

	public abstract Map sent2(Map paramMap) throws AppException;
}