package com.zlll.bba.base.dao;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dao.VouDAO;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.framework.util.DBUtil;
import gov.mof.framework.util.DTOUtil;
import gov.mof.framework.util.PaginationDTO;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.ConnectionCallback;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.jdbc.support.lob.OracleLobHandler;

import com.zlll.bba.base.dto.BBABaseDTO;
import com.zlll.bba.pay.dto.BBAPayDTO;

public class BBABaseDAO extends VouDAO implements IBBABaseDAO {
	protected int associateTag = 1;

	protected String mainTableName = "";

	protected String subTableName = "";

	protected String foreignid = "mainid";

	protected Class dtoClass = null;

	protected Class subDtoClass = null;
	protected Class ctrlDtoClass;
	protected String viewName = null;

	protected String subViewName = null;

	protected String sourceid = null;

	private LobHandler lobHandler = new OracleLobHandler();

	public int getAssociateTag() {
		return this.associateTag;
	}

	public void setAssociateTag(int associateTag) {
		this.associateTag = associateTag;
	}

	public String getMainTableName() {
		return this.mainTableName;
	}

	public void setMainTableName(String mainTableName) {
		this.mainTableName = mainTableName;
	}

	public String getSubTableName() {
		return this.subTableName;
	}

	public void setSubTableName(String subTableName) {
		this.subTableName = subTableName;
	}

	public String getForeignid() {
		return this.foreignid;
	}

	public void setForeignid(String foreignid) {
		this.foreignid = foreignid;
	}

	public Class getDtoClass() {
		return this.dtoClass;
	}

	public void setDtoClass(Class dtoClass) {
		this.dtoClass = dtoClass;
	}

	public Class getSubDtoClass() {
		return this.subDtoClass;
	}

	public void setSubDtoClass(Class subDtoClass) {
		this.subDtoClass = subDtoClass;
	}

	public Class getCtrlDtoClass() {
		return this.ctrlDtoClass;
	}

	public void setCtrlDtoClass(Class ctrlDtoClass) {
		this.ctrlDtoClass = ctrlDtoClass;
	}

	public String getViewName() {
		if ((this.viewName == null) || ("".equals(this.viewName))) {
			return this.mainTableName;
		}
		return this.viewName;
	}

	public void setViewName(String viewName) {
		this.viewName = viewName;
	}

	public String getSubViewName() {
		if ((this.subViewName == null) || ("".equals(this.subViewName))) {
			return this.subTableName;
		}
		return this.subViewName;
	}

	public void setSubViewName(String subViewName) {
		this.subViewName = subViewName;
	}

	public LobHandler getLobHandler() {
		return this.lobHandler;
	}

	public void setLobHandler(LobHandler lobHandler) {
		this.lobHandler = lobHandler;
	}

	public void setSourceid(String sourceid) {
		this.sourceid = sourceid;
	}

	public int getSequence() {
		return getSequenceByName("S_BBACOMMON");
	}

	public PaginationDTO findVous(PaginationDTO page, String where,
			String orderBy) throws AppException {
		return findVouForMainSub(where, orderBy, getViewName(), this.dtoClass,
				getSubViewName(), this.subDtoClass, page);
	}

	public PaginationDTO findVouForMainSub(String query, String sortCondition,
			String mainTableName, Class mainDtoClass,
			final String subTableName, final Class subDtoClass,
			PaginationDTO page) throws AppException {
		page = super.findPageBySql(null, query, page, mainTableName,
				sortCondition, mainDtoClass);
		List mainList = page.getResult();
		if (mainList == null || mainList.size() == 0) {
			return page;
		} else if ((this.associateTag == 1 || this.associateTag == 2)
				&& !subTableName.equals("")) {
			final int[] mainidList = getMainIdList(mainList);
			List listSub = this.executeFind(new ConnectionCallback() {
				public Object doInConnection(final Connection conn)
						throws SQLException {
					String sql = "insert into T_TMPBDGMAINID (MAINID) VALUES (?)";
					String querySql = "select  t.* from " + subTableName
							+ " t,T_TMPBDGMAINID h where " + "t." + foreignid
							+ "=h.mainid order by t." + foreignid;
					PreparedStatement ps = conn.prepareStatement(sql);
					conn.setAutoCommit(false);
					// 设置参数
					for (int i = 0, loopI = mainidList.length; i < loopI; i++) {
						ps.setInt(1, mainidList[i]);
						ps.addBatch();
						if (i % 1000 == 0) {
							ps.executeBatch();
						}
					}
					ps.executeBatch();
					PreparedStatement queryPs = conn.prepareStatement(querySql);
					putParams(queryPs, null);
					ResultSet rs = queryPs.executeQuery();
					List result = new ArrayList();
					HashMap hm = getDataRsToSubDTO(rs, subDtoClass);
					result.add(0, hm);
					try {
						rs.close();
						queryPs.close();
						ps.close();
						conn.commit();
						if (!conn.isClosed()) {
							conn.close();
						}
					} catch (RuntimeException e) {
						e.printStackTrace();
					}
					return result;
				}

			});

			mainList = combList(mainList, listSub);
		}
		return page;
	}

	public HashMap getDataRsToSubDTO(ResultSet rs, Class subDtoClass) {
		List arr = new ArrayList();
		HashMap hm = new HashMap();
		int combi = 0;
		try {
			while (rs.next()) {
				Object subDTO = getObjByReS(rs, createInstance(subDtoClass));
				List temp = new ArrayList();
				int fk = DTOUtil.getInt(subDTO, this.foreignid);
				if ((combi == 0) || (combi != fk)) {
					if (combi == 0) {
						arr.add(subDTO);
					} else {
						temp = new ArrayList(arr);
						hm.put(combi, temp);
						arr.clear();
						arr.add(subDTO);
					}
					combi = fk;
				} else {
					combi = fk;
					arr.add(subDTO);
				}
			}
			hm.put(combi, arr);
		} catch (SQLException e) {
			throw DBUtil.convertException(e);
		}
		return hm;
	}

	private int[] getMainIdList(List mainList) {
		int[] mainidList = new int[mainList.size()];
		int i = 0;
		for (int loopi = mainList.size(); i < loopi; ++i) {
			VouDTO vouDTO = (VouDTO) mainList.get(i);
			mainidList[i] = vouDTO.getBillid();
		}
		return mainidList;
	}

	public List combList(List mainList, List subList) {
		if ((subList == null) || (subList.size() == 0)) {
			return mainList;
		}
		HashMap hm = (HashMap) subList.get(0);
		int i = 0;
		for (int loopJ = mainList.size(); i < loopJ; ++i) {
			VouDTO mainVouDTO = (VouDTO) mainList.get(i);
			if (hm.get(mainVouDTO.getBillid()) == null)
				mainVouDTO.setDetails(new ArrayList());
			else {
				mainVouDTO.setDetails((List) hm.get(mainVouDTO.getBillid()));
			}
		}
		return mainList;
	}

	public PaginationDTO findVous(String sourceTable, PaginationDTO page,
			String condition, String orderBy) throws AppException {
		return super.findPageBySql(null, condition, page, sourceTable, orderBy,
				this.dtoClass);
	}

	public List create(List vouList) throws AppException {
		int i = 0;
		for (int loopi = vouList.size(); i < loopi; ++i) {
			VouDTO vouDTO = (VouDTO) vouList.get(i);
			vouDTO.setTableName(getMainTableName());
			if (vouDTO.getBillid() == 0) {
				vouDTO.setBillid(getSequence());
			}
			HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);
			insertData(hmVou);

			if (getAssociateTag() == 1) {
				vouDTO = insertSub(vouDTO);
			}
			vouList.set(i, vouDTO);
		}
		return vouList;
	}

	public List update(List vouList) throws AppException {
		String[] pkcolumn = { "billid" };
		for (Iterator iter = vouList.iterator(); iter.hasNext();) {
			VouDTO vouDTO = (VouDTO) iter.next();
			vouDTO.setTableName(getMainTableName());
			HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);

			if ((getAssociateTag() == 1) && (vouDTO.getDetails() != null)) {
				for (Iterator iter1 = vouDTO.getDetails().iterator(); iter1
						.hasNext();) {
					VouDTO detailDTO = (VouDTO) iter1.next();
					detailDTO.setTableName(getSubTableName());
					initSub(2, vouDTO, detailDTO);
					HashMap hmDetail = DTOUtil.Object2HashMap(detailDTO);
					super.updateData(hmDetail, pkcolumn);
				}
			}

			super.updateData(hmVou, pkcolumn);
		}
		return vouList;
	}

	public List delete(List vouList) throws AppException {
		String[] pkcolumn = { "billid" };
		for (Iterator iter = vouList.iterator(); iter.hasNext();) {
			VouDTO vouDTO = (VouDTO) iter.next();
			vouDTO.setTableName(getMainTableName());
			HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);

			if (getAssociateTag() == 1) {
				deleteSub(vouDTO);
			}
			deleteData(hmVou, pkcolumn);
		}
		return vouList;
	}

	public boolean isMainSub() throws AppException {
		return (this.subTableName != null) && (!this.subTableName.equals(""));
	}

	public VouDTO insertSub(VouDTO vouDTO) throws AppException {
		List subList = vouDTO.getDetails();
		int j = 0;
		for (int loopK = subList.size(); j < loopK; ++j) {
			VouDTO subVou = (VouDTO) subList.get(j);
			initSub(1, vouDTO, subVou);
			HashMap subHm = DTOUtil.Object2HashMap(subVou);
			insertData(subHm);
			subList.set(j, subVou);
		}
		vouDTO.setDetails(subList);
		return vouDTO;
	}

	public void initSub(int initType, VouDTO mainDTO, VouDTO subDTO)
			throws AppException {
		switch (initType) {
		case 1:
			if (subDTO.getBillid() == 0) {
				subDTO.setBillid(getSequence());
			}

			DTOUtil.setValue(subDTO, getForeignid(),
					new Integer(mainDTO.getBillid()));
			break;
		case 2:
		}

		subDTO.setTableName(getSubTableName());
	}

	public void deleteSub(VouDTO mainDTO) throws AppException {
		String strSql = " delete " + getSubTableName() + " where "
				+ getForeignid() + "=? ";
		List paramsList = new ArrayList();
		paramsList.add(new Integer(mainDTO.getBillid()));
		executeUpdate(strSql, paramsList);
	}

	public List findVous(String condition) throws AppException {
		return findDatas(getViewName(), condition, null, getDtoClass());
	}

	public List findDatas(String tableCode, String condition,
			String sortContion, Class dtoClass) {
		StringBuffer sql = new StringBuffer();
		sql.append("select * from ");
		sql.append(tableCode);
		if ((condition != null) && (!condition.equals(""))) {
			sql.append(" where ");
			sql.append(condition);
		}
		if ((sortContion != null) && (!sortContion.equals(""))) {
			sql.append(" order by ");
			sql.append(sortContion);
		}
		return super.findClassDatas(sql.toString(), dtoClass);
	}

	public String getSourceid() {
		return this.sourceid;
	}

	public List findSubs(int billid) throws AppException {
		if (!this.subTableName.equals("")) {
			StringBuffer sql = new StringBuffer();
			sql.append("select * from ");
			sql.append(getSubTableName());
			sql.append(" where ");
			sql.append(getForeignid());
			sql.append(" = ? ");
			List params = new ArrayList();
			params.add(new Integer(billid));
			return findBySql(sql.toString(), params, getSubDtoClass());
		}
		return null;
	}

	public List findSubs(int sourceid, String table) throws AppException {
		String tableaName = getSubTableName();
		if ((table != null) && (!"".equals(table))) {
			tableaName = table;
		}
		if (!tableaName.equals("")) {
			StringBuffer sql = new StringBuffer();
			sql.append("select * from ");
			sql.append(tableaName);
			sql.append(" where ");
			sql.append(getForeignid());
			sql.append(" = ? ");
			List params = new ArrayList();
			params.add(new Integer(sourceid));
			return findBySql(sql.toString(), params, getSubDtoClass());
		}
		return null;
	}

	public List findBySql(String sql, List params, Class dtoClass)
			throws AppException {
		if (dtoClass == null) {
			return super.executeQuery(sql, params);
		}
		return super.executeQuery(sql, params, dtoClass);
	}

	public VouDTO edit(VouDTO vouDTO) throws AppException {
		String[] pkcolumn = { "billid" };
		vouDTO.setTableName(getMainTableName());
		HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);

		if (getAssociateTag() == 1) {
			deleteSub(vouDTO);
			if ((vouDTO.getDetails() != null)
					&& (vouDTO.getDetails().size() > 0)) {
				insertSub(vouDTO);
			}
		}
		super.updateData(hmVou, pkcolumn);
		return vouDTO;
	}

	public VouDTO findOriDTO(VouDTO vouDTO) throws AppException {
		String mainSql = "select * from " + getMainTableName()
				+ " where billid=:billid";
		List params = new ArrayList();
		params.add(new Integer(vouDTO.getBillid()));
		List mainList = executeQuery(mainSql, params,
				(VouDTO) createInstance(getDtoClass()));
		VouDTO mainVou = (VouDTO) mainList.get(0);
		if ((getAssociateTag() == 1) || (getAssociateTag() == 2)) {
			String subSql = "select /*+rule*/* from " + getSubTableName()
					+ " where " + getForeignid() + "=:billid";
			List subList = executeQuery(subSql, params,
					(VouDTO) createInstance(getSubDtoClass()));
			mainVou.setDetails(subList);
		}
		return mainVou;
	}

	public List updateMain(List vouList) throws AppException {
		String[] pkcolumn = { "billid" };
		for (Iterator iter = vouList.iterator(); iter.hasNext();) {
			VouDTO vouDTO = (VouDTO) iter.next();
			vouDTO.setTableName(getMainTableName());
			HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);
			super.updateData(hmVou, pkcolumn);
		}
		return vouList;
	}

	public List updateMain(List vouList, String[] pkcolumn) throws AppException {
		for (Iterator iter = vouList.iterator(); iter.hasNext();) {
			VouDTO vouDTO = (VouDTO) iter.next();
			vouDTO.setTableName(getMainTableName());
			HashMap hmVou = DTOUtil.Object2HashMap(vouDTO);
			super.updateData(hmVou, pkcolumn);
		}
		return vouList;
	}

	public void doWayCtrl(String ctrltableName, VouDTO vouDTO)
			throws AppException {
		BBABaseDTO baseDTO = (BBABaseDTO) vouDTO;
		StringBuffer sql = new StringBuffer("update ");
		sql.append(ctrltableName);
		sql.append(" t set t.curamt=t.curamt-?");
		sql.append(" where t.ctrlid=?");
		List params = new ArrayList();
		params.add(baseDTO.getAmt());
		params.add(baseDTO.getCtrlid());
		executeUpdate(sql.toString().toUpperCase(), params);
		validataAmtData(ctrltableName, "curamt",
				"ctrlid=" + baseDTO.getCtrlid());
	}

	public void doUpdateWayCtrl(String ctrltableName, VouDTO vouDTO)
			throws AppException {
		BBABaseDTO baseDTO = (BBABaseDTO) vouDTO;
		StringBuffer sql = new StringBuffer("update ");
		sql.append(ctrltableName);
		sql.append(" t set t.curamt=t.curamt-?");
		sql.append(" where t.ctrlid=?");
		List params = new ArrayList();
		params.add(baseDTO.getTempamt());
		params.add(baseDTO.getCtrlid());
		executeUpdate(sql.toString().toUpperCase(), params);
		validataAmtData(ctrltableName, "curamt",
				"ctrlid=" + baseDTO.getCtrlid());
	}

	public void doSubWayCtrl(String ctrlTable, List subList)
			throws AppException {
		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBABaseDTO baseDTO = (BBABaseDTO) it.next();
			doWayCtrl(ctrlTable, baseDTO);
		}
	}

	public void doDelCtrl(String ctrltableName, VouDTO vouDTO)
			throws AppException {
		BBABaseDTO baseDTO = (BBABaseDTO) vouDTO;
		StringBuffer sql = new StringBuffer("update ");
		sql.append(ctrltableName);
		sql.append(" t set t.curamt=t.curamt+?");
		sql.append(" where t.ctrlid=");
		sql.append("(select superid from ");
		sql.append("T_BBA_CTRL_WAY_RELATION");
		sql.append(" where billcode = ?");
		sql.append(" and vchtypeid = ?)");
		List params = new ArrayList();
		params.add(baseDTO.getAmt());
		params.add(baseDTO.getBillcode());
		params.add(baseDTO.getVchtypeid());
		executeUpdate(sql.toString().toUpperCase(), params);
	}

	public void doAllCtrl(String ctrltableName, VouDTO vouDTO, boolean isAll)
			throws AppException {
		BBABaseDTO baseDTO = (BBABaseDTO) vouDTO;
		StringBuffer sql = new StringBuffer("update ");
		sql.append(ctrltableName);
		if (isAll)
			sql.append(" t set t.curamt=t.curamt+?,t.endamt=t.endamt+?");
		else {
			sql.append(" t set t.curamt=t.curamt-?,t.endamt=t.endamt-?");
		}
		sql.append(" where t.ctrlid=");
		sql.append("(select superid from ");
		sql.append("T_BBA_CTRL_WAY_RELATION");
		sql.append(" where billcode = ?");
		sql.append(" and vchtypeid = ?)");
		List params = new ArrayList();
		params.add(baseDTO.getAmt());
		params.add(baseDTO.getAmt());
		params.add(baseDTO.getBillcode());
		params.add(baseDTO.getVchtypeid());
		executeUpdate(sql.toString().toUpperCase(), params);
	}

	public void doEndCtrl(String ctrltableName, VouDTO vouDTO)
			throws AppException {
		BBABaseDTO baseDTO = (BBABaseDTO) vouDTO;
		StringBuffer sql = new StringBuffer("update ");
		sql.append(ctrltableName);
		if (vouDTO.getAccountnode().getCode().equals("2"))
			sql.append(" t set t.endamt=t.endamt-?");
		else {
			sql.append(" t set t.endamt=t.endamt+?");
		}
		sql.append(" where t.ctrlid=(");
		sql.append(" select a.superid from ").append("T_BBA_CTRL_WAY_RELATION");
		sql.append(" a where a.billcode =?");
		sql.append(")");
		sql.toString().toUpperCase();
		List params = new ArrayList();
		params.add(baseDTO.getAmt());
		params.add(baseDTO.getBillcode());
		executeUpdate(sql.toString().toUpperCase(), params);
	}

	public void doWayCtrlRelation(VouDTO vouDTO) throws AppException {
		BBABaseDTO baseDTO = (BBABaseDTO) vouDTO;
		List params = new ArrayList();
		params.add(baseDTO.getCtrlid());
		params.add(baseDTO.getVchtypeid());
		params.add(baseDTO.getBillcode());
		StringBuffer sql = new StringBuffer();
		if (vouDTO.getAccountnodeEx().getCode().equals("1")) {
			sql.append("insert into ");
			sql.append("T_BBA_CTRL_WAY_RELATION");
			sql.append(" values (");
			sql.append(
					"T_BBA_CTRL_RELATION".toUpperCase()
							.replaceFirst("T_", "S_")).append(".nextval,");
			sql.append("0,?,?,?)");
		} else {
			sql.append("delete ");
			sql.append("T_BBA_CTRL_WAY_RELATION");
			sql.append(" where ");
			sql.append(" superid=? and vchtypeid = ? and billcode = ?");
		}
		executeUpdate(sql.toString().toUpperCase(), params);
	}

	public void doSubWayCtrlRelation(List subList) throws AppException {
		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBABaseDTO baseDTO = (BBABaseDTO) it.next();
			doWayCtrlRelation(baseDTO);
		}
	}

	public void doCtrlRelation(VouDTO vouDTO) throws AppException {
		List params = new ArrayList();
		params.add(vouDTO.getVchtypeid());
		params.add(vouDTO.getBillcode());
		StringBuffer sql = new StringBuffer();
		if (vouDTO.getAccountnodeEx().getCode().equals("2")) {
			int ctrlid = getSequence("T_BBA_CTRL");
			vouDTO.setCtrlid(ctrlid);
			sql.append("insert into ");
			sql.append("T_BBA_CTRL_RELATION");
			sql.append(" select billid,");
			sql.append(ctrlid);
			sql.append(",superid,vchtypeid,billcode from ");
			sql.append("T_BBA_CTRL_WAY_RELATION");
			sql.append(" where 1=1 ");
			sql.append(" and vchtypeid=?");
			sql.append(" and billcode=?");
		} else {
			sql.append("delete ");
			sql.append("T_BBA_CTRL_RELATION");
			sql.append(" where ");
			sql.append(" vchtypeid = ? and billcode =?");
		}

		executeUpdate(sql.toString().toUpperCase(), params);
	}

	public void doSubCtrlRelation(List subList) throws AppException {
		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBABaseDTO baseDTO = (BBABaseDTO) it.next();
			doCtrlRelation(baseDTO);
		}
	}

	public void doGenerateCtrl(String ctrltablename, VouDTO vouDTO)
			throws AppException {
		BBABaseDTO baseDTO = (BBABaseDTO) vouDTO;
		baseDTO.setTableName(ctrltablename);

		baseDTO.setLastupdatetime(System.currentTimeMillis());
		if (vouDTO.getAccountnodeEx().getCode().equals("2")) {
			baseDTO.setCuramt(baseDTO.getAmt());
			baseDTO.setEndamt(baseDTO.getAmt());
			if (baseDTO.getCtrlid() == 0) {
				baseDTO.setCtrlid(getSequence(ctrltablename));
			}
			HashMap hmVou = DTOUtil.Object2HashMap(baseDTO);
			insertData(hmVou);
		} else {
			String[] pkColumn = { "billcode" };
			HashMap hmVou = DTOUtil.Object2HashMap(baseDTO);
			deleteData(hmVou, pkColumn);
		}
	}

	public void doSubGenerateCtrl(String ctrlTable, List subList)
			throws AppException {
		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBABaseDTO baseDTO = (BBABaseDTO) it.next();
			baseDTO.setTableName(ctrlTable);

			baseDTO.setLastupdatetime(System.currentTimeMillis());
			if (baseDTO.getAccountnodeEx().getCode().equals("2")) {
				baseDTO.setCuramt(baseDTO.getAmt());
				baseDTO.setEndamt(baseDTO.getAmt());
				if (baseDTO.getCtrlid() == 0) {
					baseDTO.setCtrlid(getSequence(ctrlTable));
				}
				HashMap hmVou = DTOUtil.Object2HashMap(baseDTO);
				insertData(hmVou);
			} else {
				String[] pkColumn = { "billcode" };
				HashMap hmVou = DTOUtil.Object2HashMap(baseDTO);
				deleteData(hmVou, pkColumn);
			}
		}
	}

	public void doRefData(String tableName, VouDTO vouDTO) throws AppException {
		StringBuffer sql = new StringBuffer();
		sql.append("select t.* from ");
		sql.append(tableName);
		sql.append(" t where t.ctrlid=?");
		List params = new ArrayList();
		params.add(vouDTO.getBillid());
		List result = findBySql(sql.toString().toUpperCase(), params,
				this.dtoClass);
		if ((result == null) || (result.isEmpty()))
			return;
		if (result.size() == 1) {
			BBABaseDTO baseDTO = (BBABaseDTO) result.get(0);
			if (baseDTO.getAmt().compareTo(baseDTO.getCuramt()) > 0)
				throw new AppException("0", "该数据已经被支出凭证关联，不能取消审核！");
		} else {
			throw new AppException("0", "数据异常，请先查看相关数据或联系管理员！");
		}
	}

	public void doDelDownCtrl(String downTableName, VouDTO vouDTO)
			throws AppException {
	}

	public void doWayEndCtrl(String ctrltableName, BBABaseDTO baseDTO)
			throws AppException {
		StringBuffer sql = new StringBuffer("update ");
		sql.append(ctrltableName);
		if (baseDTO.getAccountnode().getCode().equals("2"))
			sql.append(" t set t.endamt=t.endamt-?,t.curamt=t.curamt-?");
		else {
			sql.append(" t set t.endamt=t.endamt+?,t.curamt=t.curamt+?");
		}
		sql.append(" where t.ctrlid=?");
		sql.toString().toUpperCase();
		List params = new ArrayList();
		params.add(baseDTO.getAmt());
		params.add(baseDTO.getAmt());
		params.add(baseDTO.getCtrlid());
		executeUpdate(sql.toString().toUpperCase(), params);

		validataAmtData(ctrltableName, "curamt",
				"ctrlid=" + baseDTO.getCtrlid());
	}

	public List findCtrl(String whereSql, String orderColumn)
			throws AppException {
		return findDatas("T_BBA_CTRL", whereSql, orderColumn, this.ctrlDtoClass);
	}

	public List findCtrl(String sql, List params) throws AppException {
		StringBuffer buffer = new StringBuffer("select * from ");
		buffer.append("T_BBA_CTRL");
		buffer.append(" where");
		buffer.append(sql);
		return findBySql(buffer.toString().toUpperCase(), params,
				this.ctrlDtoClass);
	}

	public void doDelCtrlRelation(VouDTO vouDTO) throws AppException {
		List params = new ArrayList();
		params.add(vouDTO.getVchtypeid());
		params.add(vouDTO.getBillcode());
		StringBuffer sql = new StringBuffer();
		sql.append("delete ");
		sql.append("T_BBA_CTRL_WAY_RELATION");
		sql.append(" where ");
		sql.append(" vchtypeid = ? and billcode = ?");
		executeUpdate(sql.toString().toUpperCase(), params);
	}

	public void doDelSubCtrlRelation(List subList) throws AppException {
		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBABaseDTO baseDTO = (BBABaseDTO) it.next();
			doDelCtrlRelation(baseDTO);
		}
	}

	public void doDelSubCtrl(String ctrlTable, List subList)
			throws AppException {
		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBABaseDTO baseDTO = (BBABaseDTO) it.next();
			doDelCtrl(ctrlTable, baseDTO);
		}
	}

	public void doDelSubCtrl(String ctrlTable, List subList, boolean isAll)
			throws AppException {
		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBABaseDTO baseDTO = (BBABaseDTO) it.next();
			doAllCtrl(ctrlTable, baseDTO, isAll);
		}
	}

	public void doSubEndCtrl(String ctrlTable, List subList)
			throws AppException {
		for (Iterator it = subList.iterator(); it.hasNext();) {
			BBABaseDTO baseDTO = (BBABaseDTO) it.next();
			doEndCtrl(ctrlTable, baseDTO);
		}
	}

	public void validataAmtData(String tablename, String amtattr, String sqlcon)
			throws AppException {
		StringBuffer sql = new StringBuffer("select ");
		sql.append(amtattr).append(" as amtattr ");
		sql.append(" from ").append(tablename);
		sql.append(" where ").append(sqlcon);
		List result = executeQuery(sql.toString(), null);
		String msg = "金额";
		if (amtattr.toLowerCase().equals("curamt")) {
			msg = "可用金额";
		}
		if (result.size() == 1) {
			String value = ((Map) result.get(0)).get("amtattr").toString();
			BigDecimal amtValue = new BigDecimal(value);
			if (amtValue.compareTo(new BigDecimal(0.0D)) < 0)
				throw new AppException("0", msg + "已发生变化，请刷新数据重新录入！");
		}
	}

	public List findGatherAccountNo(String condition) throws AppException {
		String sql = "select * from T_BBA_GATHER_BANK_ACCOUNT where "
				+ condition;
		return executeQuery(sql, null);
	}

	public void addGatherAccountNo(BBAPayDTO payDTO) throws AppException {
		String condition = "budgetagency=" + payDTO.getBudgetagency();
		if (payDTO.getSkaccountname().trim().length() < 1)
			condition = condition + " and skaccountname is null";
		else {
			condition = condition + " and skaccountname ='"
					+ payDTO.getSkaccountname() + "'";
		}

		if (payDTO.getSkaccountno().trim().length() < 1)
			condition = condition + " and skaccountno is null";
		else {
			condition = condition + " and skaccountno ='"
					+ payDTO.getSkaccountno() + "'";
		}
		boolean isExists = isExistsGatherAccountNo(condition);
		if (isExists) {
			return;
		}
		String sql = "insert into T_BBA_GATHER_BANK_ACCOUNT (itemid,budgetagency,skaccountname,skaccountno) values(?,?,?,?)";

		List params = new ArrayList();
		params.add(getSequence("T_BBA_GATHER_BANK_ACCOUNT"));
		params.add(payDTO.getBudgetagency());
		params.add(payDTO.getSkaccountname().trim());
		params.add(payDTO.getSkaccountno().trim());
		executeUpdate(sql, params);
	}

	private boolean isExistsGatherAccountNo(String condition)
			throws AppException {
		List result = findGatherAccountNo(condition);

		return (result == null) || (!result.isEmpty());
	}

	public List comListsByGroupBy(String tableName, String attr,
			String whereSql, String groupbySql, Class dtoClass)
			throws AppException {
		StringBuffer sql = new StringBuffer("select ");
		sql.append(attr).append(",");
		sql.append(groupbySql);
		sql.append(" from ").append(tableName);
		sql.append(" where ").append(whereSql);
		sql.append(" group by ").append(groupbySql);
		return findBySql(sql.toString(), null, dtoClass);
	}

	public void doUpdateCtrlAttr(String ctrlTable, String[] attrName,
			String[] attrValue, String billcode) throws AppException {
		StringBuffer sql = new StringBuffer("update ");
		sql.append(ctrlTable).append(" set ");
		List params = new ArrayList();
		for (int i = 0; i < attrName.length; ++i) {
			sql.append(attrName[i]).append("=?,");
			params.add(attrValue[i]);
		}
		StringBuffer sql2 = new StringBuffer(sql.substring(0, sql.length() - 1));
		sql2.append(" where billcode =?");
		params.add(billcode);
		executeUpdate(sql2.toString(), params);
	}
}