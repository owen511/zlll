package com.zlll.bba.pay.dao;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.fasp.pa.IPaService;
import gov.mof.framework.util.DTOUtil;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.zlll.bba.base.dao.BBABaseDAO;
import com.zlll.bba.pay.dto.BBAPaySubDTO;

public class BBAPayDAO extends BBABaseDAO implements IBBAPayDAO {
	protected IPaService paService = null;

	public IPaService getPaService() {
		return this.paService;
	}

	public void setPaService(IPaService paService) {
		this.paService = paService;
	}

	public VouDTO insertSub(VouDTO vouDTO) throws AppException {
		List subList = vouDTO.getDetails();
		int j = 0;
		for (int loopK = subList.size(); j < loopK; ++j) {
			VouDTO subVou = (VouDTO) subList.get(j);

			subVou.setBillcode(this.paService.getVchSerialRuleID(vouDTO));
			initSub(1, vouDTO, subVou);
			HashMap subHm = DTOUtil.Object2HashMap(subVou);
			insertData(subHm);
			subList.set(j, subVou);
		}
		vouDTO.setDetails(subList);
		return vouDTO;
	}

	public List findPaySubList(String billcode) throws AppException {
		StringBuffer table = new StringBuffer();
		table.append("(select m.billcode as frombillcode,s.* from ").append(
				this.subTableName);
		table.append(" s,").append(this.mainTableName).append(" m ");
		table.append(" where m.billid = s.mainid )");
		String whereSql = " frombillcode ='" + billcode + "'";
		return findDatas(table.toString(), whereSql, "billcode",
				this.subDtoClass);
	}

	public void updatePayMain(VouDTO vouDTO) throws AppException {
		List vouList = new ArrayList();
		vouList.add(vouDTO);
		updateMain(vouList);
	}

	public void updatePayInfo(String[] amtAttrs, BigDecimal[] amtValues,
			String whereSql, boolean isCancel) throws AppException {
		if (amtAttrs.length != amtValues.length) {
			throw new AppException("0", "参数个数和属性个数不一致!");
		}
		if (whereSql.trim().length() < 1) {
			throw new AppException("0", "修改条件不能为空!");
		}
		List params = new ArrayList();
		StringBuffer sql = new StringBuffer("update ");
		sql.append(this.mainTableName);
		for (int i = 0; i < amtAttrs.length; ++i) {
			sql.append(" set ").append(amtAttrs[i]).append(" = ")
					.append(amtAttrs[i]);
			if (isCancel)
				sql.append(" + ?");
			else {
				sql.append(" - ?");
			}
			if (i < amtAttrs.length - 1) {
				sql.append(",");
			}
			params.add(amtValues[i]);
		}
		sql.append(" where ").append(whereSql);
		executeUpdate(sql.toString().toUpperCase(), params);
	}

	public void deletePaySub(String whereSql) throws AppException {
		String sql = "delete from " + this.subTableName + " where " + whereSql;
		executeUpdate(sql, null);
	}

	public void insertPaySub(BBAPaySubDTO vouDTO, boolean isCancel)
			throws AppException {
		vouDTO.setTableName(this.subTableName);

		vouDTO.setBillid(getSequence());
		HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);
		if (isCancel) {
			insertData(hmVou);
		} else {
			String[] pkColumn = { "billcode" };
			deleteData(hmVou, pkColumn);
		}
	}

	public void updatePaySub(BBAPaySubDTO vouDTO, boolean isCancel)
			throws AppException {
		String[] pkColumn = { "billid" };
		vouDTO.setTableName(this.subTableName);
		HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);
		updateData(hmVou, pkColumn);
	}
}