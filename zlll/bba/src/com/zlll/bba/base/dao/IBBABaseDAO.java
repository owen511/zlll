package com.zlll.bba.base.dao;

import com.zlll.bba.base.dto.BBABaseDTO;
import com.zlll.bba.pay.dto.BBAPayDTO;
import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.framework.util.PaginationDTO;
import java.util.List;

public abstract interface IBBABaseDAO {
	public abstract String getMainTableName();

	public abstract String getSubTableName();

	public abstract PaginationDTO findVous(PaginationDTO paramPaginationDTO,
			String paramString1, String paramString2) throws AppException;

	public abstract Class getSubDtoClass();

	public abstract Class getDtoClass();

	public abstract PaginationDTO findVouForMainSub(String paramString1,
			String paramString2, String paramString3, Class paramClass1,
			String paramString4, Class paramClass2,
			PaginationDTO paramPaginationDTO) throws AppException;

	public abstract PaginationDTO findVous(String paramString1,
			PaginationDTO paramPaginationDTO, String paramString2,
			String paramString3) throws AppException;

	public abstract List create(List paramList) throws AppException;

	public abstract List update(List paramList) throws AppException;

	public abstract List delete(List paramList) throws AppException;

	public abstract boolean isMainSub() throws AppException;

	public abstract VouDTO insertSub(VouDTO paramVouDTO) throws AppException;

	public abstract void initSub(int paramInt, VouDTO paramVouDTO1,
			VouDTO paramVouDTO2) throws AppException;

	public abstract void deleteSub(VouDTO paramVouDTO) throws AppException;

	public abstract List findVous(String paramString) throws AppException;

	public abstract List findDatas(String paramString1, String paramString2,
			String paramString3, Class paramClass);

	public abstract String getSourceid();

	public abstract List findSubs(int paramInt) throws AppException;

	public abstract List findSubs(int paramInt, String paramString)
			throws AppException;

	public abstract List findBySql(String paramString, List paramList,
			Class paramClass) throws AppException;

	public abstract VouDTO edit(VouDTO paramVouDTO) throws AppException;

	public abstract VouDTO findOriDTO(VouDTO paramVouDTO) throws AppException;

	public abstract List updateMain(List paramList) throws AppException;

	public abstract void doWayCtrl(String paramString, VouDTO paramVouDTO)
			throws AppException;

	public abstract void doDelCtrl(String paramString, VouDTO paramVouDTO)
			throws AppException;

	public abstract void doAllCtrl(String paramString, VouDTO paramVouDTO,
			boolean paramBoolean) throws AppException;

	public abstract void doEndCtrl(String paramString, VouDTO paramVouDTO)
			throws AppException;

	public abstract void doCtrlRelation(VouDTO paramVouDTO) throws AppException;

	public abstract void doWayCtrlRelation(VouDTO paramVouDTO)
			throws AppException;

	public abstract void doGenerateCtrl(String paramString, VouDTO paramVouDTO)
			throws AppException;

	public abstract void doDelDownCtrl(String paramString, VouDTO paramVouDTO)
			throws AppException;

	public abstract void doWayEndCtrl(String paramString,
			BBABaseDTO paramBBABaseDTO) throws AppException;

	public abstract void doRefData(String paramString, VouDTO paramVouDTO)
			throws AppException;

	public abstract List findCtrl(String paramString1, String paramString2)
			throws AppException;

	public abstract List findCtrl(String paramString, List paramList)
			throws AppException;

	public abstract void doSubWayCtrlRelation(List paramList)
			throws AppException;

	public abstract void doSubWayCtrl(String paramString, List paramList)
			throws AppException;

	public abstract void doSubGenerateCtrl(String paramString, List paramList)
			throws AppException;

	public abstract void doSubCtrlRelation(List paramList) throws AppException;

	public abstract void doDelCtrlRelation(VouDTO paramVouDTO)
			throws AppException;

	public abstract void doDelSubCtrlRelation(List paramList)
			throws AppException;

	public abstract void doDelSubCtrl(String paramString, List paramList)
			throws AppException;

	public abstract void doSubEndCtrl(String paramString, List paramList)
			throws AppException;

	public abstract List updateMain(List paramList, String[] paramArrayOfString)
			throws AppException;

	public abstract void doUpdateWayCtrl(String paramString, VouDTO paramVouDTO)
			throws AppException;

	public abstract void validataAmtData(String paramString1,
			String paramString2, String paramString3) throws AppException;

	public abstract List findGatherAccountNo(String paramString)
			throws AppException;

	public abstract void addGatherAccountNo(BBAPayDTO paramBBAPayDTO)
			throws AppException;

	public abstract List comListsByGroupBy(String paramString1,
			String paramString2, String paramString3, String paramString4,
			Class paramClass) throws AppException;

	public abstract void doDelSubCtrl(String paramString, List paramList,
			boolean paramBoolean) throws AppException;

	public abstract void doUpdateCtrlAttr(String paramString1,
			String[] paramArrayOfString1, String[] paramArrayOfString2,
			String paramString2) throws AppException;
}