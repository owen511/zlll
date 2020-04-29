package com.zlll.bba.base.bpo;

import com.zlll.bba.base.bo.IBBABaseBO;
import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.framework.util.PaginationDTO;
import java.util.List;

public class BBABaseBPO implements IBBABaseBPO {
	private IBBABaseBO bbaBaseBO;

	public IBBABaseBO getBbaBaseBO() {
		return this.bbaBaseBO;
	}

	public void setBbaBaseBO(IBBABaseBO bbaBaseBO) {
		this.bbaBaseBO = bbaBaseBO;
	}

	public PaginationDTO findVous(int menuid, List querylist, List stepidList,
			PaginationDTO page, String sqlWhere, String orderBy)
			throws AppException {
		return this.bbaBaseBO.findVous(menuid, querylist, stepidList, page,
				sqlWhere, orderBy);
	}

	public PaginationDTO findSources(int menuid, String conditions,
			String orderBy, PaginationDTO page) throws AppException {
		return this.bbaBaseBO.findSources(menuid, conditions, orderBy, page);
	}

	public VouDTO instanceMainDTO() throws AppException {
		return this.bbaBaseBO.instanceMainDTO();
	}

	public VouDTO instanceSubDTO() throws AppException {
		return this.bbaBaseBO.instanceSubDTO();
	}

	public List findVous(String condition) throws AppException {
		return this.bbaBaseBO.findVous(condition);
	}

	public List findDetails(VouDTO mainDTO) throws AppException {
		return this.bbaBaseBO.findDetails(mainDTO);
	}

	public List findSource(VouDTO mainDTO) throws AppException {
		return this.bbaBaseBO.findSource(mainDTO);
	}

	public List findCtrl(String whereSql) throws AppException {
		return this.bbaBaseBO.findCtrl(whereSql);
	}

	public List showGatherAccountNo(String condition) throws AppException {
		return this.bbaBaseBO.showGatherAccountNo(condition);
	}

	public List findCtrl(String whereSql, String whereSql2) throws AppException {
		return this.bbaBaseBO.findCtrl(whereSql, whereSql2);
	}
}