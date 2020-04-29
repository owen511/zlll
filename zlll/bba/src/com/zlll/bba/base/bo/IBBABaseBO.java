package com.zlll.bba.base.bo;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.framework.util.PaginationDTO;

import java.util.List;

public abstract interface IBBABaseBO {
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

	public abstract PaginationDTO findSources(int paramInt,
			String paramString1, String paramString2,
			PaginationDTO paramPaginationDTO) throws AppException;

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

	public abstract VouDTO instanceMainDTO() throws AppException;

	public abstract VouDTO instanceSubDTO() throws AppException;

	public abstract List createVou(List paramList) throws AppException;

	public abstract List deleteVou(List paramList) throws AppException;

	public abstract List updateVou(List paramList) throws AppException;

	public abstract List auditVou(List paramList) throws AppException;

	public abstract List abolishVou(List paramList) throws AppException;

	public abstract void doPreCreate(List paramList) throws AppException;

	public abstract void doPostCreate(List paramList) throws AppException;

	public abstract void doPreDelete(List paramList) throws AppException;

	public abstract void doPreUpdate(List paramList) throws AppException;

	public abstract void doPostUpdate(List paramList) throws AppException;

	public abstract void doPreAudit(List paramList) throws AppException;

	public abstract void doPostAudit(List paramList) throws AppException;

	public abstract List doUpdateAudit(List paramList) throws AppException;

	public abstract void checkRefData(List paramList) throws AppException;

	public abstract void doWayCtrl(VouDTO paramVouDTO) throws AppException;

	public abstract void doDelCtrl(VouDTO paramVouDTO) throws AppException;

	public abstract void doEndCtrl(VouDTO paramVouDTO) throws AppException;

	public abstract void doWayEndCtrl(VouDTO paramVouDTO) throws AppException;

	public abstract PaginationDTO findVous(int paramInt, List paramList1,
			List paramList2, PaginationDTO paramPaginationDTO,
			String paramString1, String paramString2) throws AppException;

	public abstract List findCtrl(String paramString) throws AppException;

	public abstract List findSource(VouDTO paramVouDTO) throws AppException;

	public abstract List findDetails(VouDTO paramVouDTO) throws AppException;

	public abstract List showGatherAccountNo(String paramString)
			throws AppException;

	public abstract List sendRemoteVou(List paramList) throws AppException;

	public abstract List findCtrl(String paramString1, String paramString2)
			throws AppException;
}