package com.zlll.bba.plan.dao;

import gov.mof.fasp.AppException;
import gov.mof.framework.util.DTOUtil;
import gov.mof.framework.util.PaginationDTO;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.zlll.bba.base.dao.BBABaseDAO;
import com.zlll.bba.plan.dto.BBAPlanDTO;

public class BBAPlanDAO extends BBABaseDAO implements IBBAPlanDAO {
	public PaginationDTO findBankReceiveData(PaginationDTO page,
			String filterSql) throws AppException {
		page = findPageBySql(null, filterSql, page, "T_BBA_BANK_RECEIVE", "",
				this.dtoClass);
		return page;
	}

	public List findBankSendData() throws AppException {
		return findDatas("T_BBA_BANK_SEND", "billcode is null",
				"frombankno desc", this.dtoClass);
	}

	public PaginationDTO findBankSendData(PaginationDTO page, String whereSql)
			throws AppException {
		String filterSql = "billcode is null";
		if (whereSql.trim().length() > 0) {
			filterSql = filterSql + " and " + whereSql;
		}
		return findPageBySql(null, filterSql, page, "T_BBA_BANK_SEND",
				"frombankno", this.dtoClass);
	}

	public List findBankSendData(String whereSql) throws AppException {
		return findDatas("T_BBA_BANK_SEND", whereSql, "frombankno",
				this.dtoClass);
	}

	public void generateComData(List vouList) throws AppException {
		generate(vouList);
	}

	public List generate(List vouList) throws AppException {
		int i = 0;
		for (int loopi = vouList.size(); i < loopi; ++i) {
			BBAPlanDTO vouDTO = (BBAPlanDTO) vouList.get(i);
			vouDTO.setTableName("T_BBA_BANK_RECEIVE");
			if (vouDTO.getCtrlid() == 0) {
				vouDTO.setCtrlid(getSequence("T_BBA_BANK_RECEIVE"));
			}
			HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);
			insertData(hmVou);
			for (Iterator subIt = vouDTO.getDetails().iterator(); subIt
					.hasNext();) {
				BBAPlanDTO subDTO = (BBAPlanDTO) subIt.next();
				HashMap map = new HashMap();
				map.put("billcode", vouDTO.getBillcode());
				updateData(new String[] { "billcode" }, map, "frombankno ='"
						+ subDTO.getFrombankno() + "'", "T_BBA_BANK_SEND");
			}
			vouList.set(i, vouDTO);
		}
		return vouList;
	}

	public Map deleteGenerateData(String whereSql) throws AppException {
		Map msgMap = new HashMap();
		StringBuffer succSql = new StringBuffer(" (");
		int succ = 0;
		int fail = 0;

		StringBuffer warnMsg = new StringBuffer();
		String prefix = whereSql.substring(0, whereSql.indexOf("in") + 2);
		String sql = "select * from T_BBA_BANK_RECEIVE where " + whereSql;
		List result = findBySql(sql, null, this.dtoClass);
		for (Iterator it = result.iterator(); it.hasNext();) {
			BBAPlanDTO planDTO = (BBAPlanDTO) it.next();
			if (planDTO.getAmt().compareTo(planDTO.getCuramt()) == 0) {
				succSql.append("'").append(planDTO.getBillcode()).append("',");
				++succ;
			} else {
				warnMsg.append("单据" + planDTO.getBillcode() + "已被使用不能删除\r\n");
				++fail;
			}
		}
		succSql.append("'0')");
		msgMap.put("warnmsg", "共处理【" + (succ + fail) + "】条数据\n其中：成功【" + succ
				+ "】条，失败【" + fail + "】条\n" + warnMsg);

		sql = "delete from T_BBA_BANK_RECEIVE where " + prefix + succSql;
		executeUpdate(sql, null);

		sql = "update T_BBA_BANK_SEND set billcode = '' where " + prefix
				+ succSql;
		executeUpdate(sql, null);
		return msgMap;
	}
}