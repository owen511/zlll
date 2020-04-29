package com.zlll.bba.planadjust.bo;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.framework.util.PaginationDTO;

import java.util.List;

import com.zlll.bba.plan.bo.BBAPlanBO;
import com.zlll.bba.planadjust.dao.IBBAPlanAdjustDAO;
import com.zlll.bba.planadjust.dto.BBAPlanAdjustDTO;
import com.zlll.bba.planadjust.dto.BBAPlanAdjustSubDTO;

public class BBAPlanAdjustBO extends BBAPlanBO implements IBBAPlanAdjustBO {
	private IBBAPlanAdjustDAO bbaPlanAdjustDAO;

	public IBBAPlanAdjustDAO getBbaPlanAdjustDAO() {
		return this.bbaPlanAdjustDAO;
	}

	public void setBbaPlanAdjustDAO(IBBAPlanAdjustDAO bbaPlanAdjustDAO) {
		this.bbaPlanAdjustDAO = bbaPlanAdjustDAO;
	}

	public PaginationDTO findSources(PaginationDTO page, String condition,
			String orderBy) throws AppException {
		if (this.sourceDAO != null) {
			String sourceTable = this.sourceDAO.getMainTableName();
			if (this.sourceMainTableName != null) {
				sourceTable = this.sourceMainTableName;
			}
			if (this.hasSub) {
				String subSourceTable = this.sourceDAO.getSubTableName();
				if (this.sourceSubTableName != null) {
					subSourceTable = this.sourceSubTableName;
				}
				return this.sourceDAO.findVouForMainSub(condition, orderBy,
						sourceTable, this.sourceDAO.getDtoClass(),
						subSourceTable, this.sourceDAO.getSubDtoClass(), page);
			}
			return this.sourceDAO.findVous(sourceTable, page, condition,
					orderBy);
		}

		return page;
	}

	public void doWayCtrl(VouDTO vouDTO) throws AppException {
		getBbaBaseDAO().doWayCtrlRelation(vouDTO);
		getBbaBaseDAO().doWayCtrl("T_BBA_CTRL", vouDTO);
	}

	public void doDelCtrl(VouDTO vouDTO) throws AppException {
		getBbaBaseDAO().doDelCtrl("T_BBA_CTRL", vouDTO);
		getBbaBaseDAO().doDelCtrlRelation(vouDTO);
	}

	public void doEndCtrl(VouDTO vouDTO) throws AppException {
		getBbaBaseDAO().doEndCtrl("T_BBA_CTRL", vouDTO);

		getBbaBaseDAO().doCtrlRelation(vouDTO);

		vouDTO.setElement01(3);
		getBbaBaseDAO().doGenerateCtrl("T_BBA_CTRL", vouDTO);
	}

	public List findToData(BBAPlanAdjustDTO adjustDTO) throws AppException {
		return this.bbaPlanAdjustDAO.findToData(adjustDTO);
	}

	public List findFromData(BBAPlanAdjustDTO adjustDTO) throws AppException {
		return this.bbaPlanAdjustDAO.findFromData(adjustDTO);
	}

	protected void initBcInfo(VouDTO mainDTO) throws AppException {
		List subList = mainDTO.getDetails();
		if ((subList != null) && (subList.size() > 0)) {
			int i = 0;
			for (int loopJ = subList.size(); i < loopJ; ++i) {
				BBAPlanAdjustSubDTO subDTO = (BBAPlanAdjustSubDTO) subList
						.get(i);
				if (subDTO.getDc() == 1) {
					subDTO.setStartamt(mainDTO.getAmt().negate());
					subDTO.setAmt(mainDTO.getAmt().negate());
					subList.set(0, subDTO);
				}
				if (subDTO.getDc() == -1) {
					subDTO.setStartamt(mainDTO.getAmt());
					subDTO.setAmt(mainDTO.getAmt());
					subList.set(1, subDTO);
				}
			}
		}
		mainDTO.setStartamt(mainDTO.getAmt());
		mainDTO.setDetails(subList);
	}

	public void doUpdateWayCtrl(VouDTO vouDTO) throws AppException {
		getBbaBaseDAO().doUpdateWayCtrl("T_BBA_CTRL", vouDTO);
	}
}