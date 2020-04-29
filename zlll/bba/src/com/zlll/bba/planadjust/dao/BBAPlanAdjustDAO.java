package com.zlll.bba.planadjust.dao;

import com.zlll.bba.plan.dao.BBAPlanDAO;
import com.zlll.bba.planadjust.dto.BBAPlanAdjustDTO;
import gov.mof.fasp.AppException;
import java.util.List;

public class BBAPlanAdjustDAO extends BBAPlanDAO implements IBBAPlanAdjustDAO {
	public List findToData(BBAPlanAdjustDTO adjustDTO) throws AppException {
		String whereSql = " billcode = '" + adjustDTO.getBillcode() + "'";
		return findDatas(this.mainTableName, whereSql, "", this.dtoClass);
	}

	public List findFromData(BBAPlanAdjustDTO adjustDTO) throws AppException {
		StringBuffer sqlWhereBuffer = new StringBuffer();
		sqlWhereBuffer.append(" ctrlid =(select superid from ");
		sqlWhereBuffer.append("T_BBA_CTRL_WAY_RELATION");
		sqlWhereBuffer.append(" where billcode ='");
		sqlWhereBuffer.append(adjustDTO.getBillcode()).append("'");
		sqlWhereBuffer.append(" and vchtypeid =");
		sqlWhereBuffer.append(adjustDTO.getVchtypeid());
		sqlWhereBuffer.append(")");
		return findDatas("T_BBA_CTRL", sqlWhereBuffer.toString(), "",
				this.dtoClass);
	}
}