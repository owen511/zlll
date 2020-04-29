package com.zlll.bba.base.bo;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ca.menu.IMenuBPO;
import gov.mof.fasp.ca.menu.MenuDTO;
import gov.mof.fasp.dic.column.dto.ColumnDTO;
import gov.mof.fasp.ifmis.common.bo.VouBO;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.fasp.pa.vchcomrule.bpo.IVchComRuleBPO;
import gov.mof.fasp.pa.vchcomrule.dto.VchComRuleDTO;
import gov.mof.fasp.pa.vchcomruletype.bpo.IVchComRuleTypeBPO;
import gov.mof.fasp.pa.vchcomruletype.dto.VchComRuleTypeDTO;
import gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO;
import gov.mof.fasp.rule.IComRuleCfgService;
import gov.mof.fasp.rule.rucomitem.dto.RuleComCfgDTO;
import gov.mof.fasp.sec.util.SecureUtil;
import gov.mof.fasp.wf.work.WfContextDTO;
import gov.mof.framework.util.DTOUtil;
import gov.mof.framework.util.PaginationDTO;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import com.zlll.bba.base.dao.IBBABaseDAO;

public class BBABaseBO extends VouBO implements IBBABaseBO {
	private IBBABaseDAO bbaBaseDAO;
	protected IBBABaseDAO sourceDAO;
	private IMenuBPO menuBPO;
	protected String sourceMainTableName;
	protected String sourceSubTableName;
	protected boolean hasSub = false;
	private IVchComRuleTypeBPO vchComRuleTypeBPO;
	private IVchComRuleBPO vchComRuleBPO;
	private IComRuleCfgService comcfgservice;

	public IVchComRuleTypeBPO getVchComRuleTypeBPO() {
		return this.vchComRuleTypeBPO;
	}

	public void setVchComRuleTypeBPO(IVchComRuleTypeBPO vchComRuleTypeBPO) {
		this.vchComRuleTypeBPO = vchComRuleTypeBPO;
	}

	public IVchComRuleBPO getVchComRuleBPO() {
		return this.vchComRuleBPO;
	}

	public void setVchComRuleBPO(IVchComRuleBPO vchComRuleBPO) {
		this.vchComRuleBPO = vchComRuleBPO;
	}

	public IComRuleCfgService getComcfgservice() {
		return this.comcfgservice;
	}

	public void setComcfgservice(IComRuleCfgService comcfgservice) {
		this.comcfgservice = comcfgservice;
	}

	public IBBABaseDAO getBbaBaseDAO() {
		return this.bbaBaseDAO;
	}

	public void setBbaBaseDAO(IBBABaseDAO bbaBaseDAO) {
		this.bbaBaseDAO = bbaBaseDAO;
	}

	public IBBABaseDAO getSourceDAO() {
		return this.sourceDAO;
	}

	public void setSourceDAO(IBBABaseDAO sourceDAO) {
		this.sourceDAO = sourceDAO;
	}

	public IMenuBPO getMenuBPO() {
		return this.menuBPO;
	}

	public void setMenuBPO(IMenuBPO menuBPO) {
		this.menuBPO = menuBPO;
	}

	public String getSourceMainTableName() {
		return this.sourceMainTableName;
	}

	public void setSourceMainTableName(String sourceMainTableName) {
		this.sourceMainTableName = sourceMainTableName;
	}

	public String getSourceSubTableName() {
		return this.sourceSubTableName;
	}

	public void setSourceSubTableName(String sourceSubTableName) {
		this.sourceSubTableName = sourceSubTableName;
	}

	public boolean isHasSub() {
		return this.hasSub;
	}

	public void setHasSub(boolean hasSub) {
		this.hasSub = hasSub;
	}

	public String getMainTableName() {
		return this.bbaBaseDAO.getMainTableName();
	}

	public String getSubTableName() {
		return this.bbaBaseDAO.getSubTableName();
	}

	public PaginationDTO findVous(PaginationDTO page, String where,
			String orderBy) throws AppException {
		return this.bbaBaseDAO.findVous(page, where, orderBy);
	}

	public Class getSubDtoClass() {
		return this.bbaBaseDAO.getSubDtoClass();
	}

	public Class getDtoClass() {
		return this.bbaBaseDAO.getDtoClass();
	}

	public PaginationDTO findVouForMainSub(String condition,
			String sortCondition, String mainTableName, Class dtoClass,
			String subTableName, Class subDtoClass, PaginationDTO page)
			throws AppException {
		return findVouForMainSub(condition, sortCondition, mainTableName,
				dtoClass, subTableName, subDtoClass, page);
	}

	public PaginationDTO findVous(String sourceTable, PaginationDTO page,
			String condition, String orderBy) throws AppException {
		return this.bbaBaseDAO.findVous(sourceTable, page, condition, orderBy);
	}

	public List create(List vouList) throws AppException {
		return this.bbaBaseDAO.create(vouList);
	}

	public List update(List vouList) throws AppException {
		return this.bbaBaseDAO.update(vouList);
	}

	public List delete(List vouList) throws AppException {
		return this.bbaBaseDAO.delete(vouList);
	}

	public boolean isMainSub() throws AppException {
		return false;
	}

	public VouDTO insertSub(VouDTO vouDTO) throws AppException {
		return this.bbaBaseDAO.insertSub(vouDTO);
	}

	public void initSub(int initType, VouDTO mainDTO, VouDTO subDTO)
			throws AppException {
		this.bbaBaseDAO.initSub(initType, mainDTO, subDTO);
	}

	public void deleteSub(VouDTO mainDTO) throws AppException {
		this.bbaBaseDAO.deleteSub(mainDTO);
	}

	public List findVous(String condition) throws AppException {
		return this.bbaBaseDAO.findVous(condition);
	}

	public List findDatas(String tableCode, String condition,
			String sortContion, Class dtoClass) {
		return this.bbaBaseDAO.findDatas(tableCode, condition, sortContion,
				dtoClass);
	}

	public String getSourceid() {
		return this.bbaBaseDAO.getSourceid();
	}

	public List findSubs(int billid) throws AppException {
		return this.bbaBaseDAO.findSubs(billid);
	}

	public List findSubs(int sourceid, String subSourceTableName)
			throws AppException {
		return this.bbaBaseDAO.findSubs(sourceid, subSourceTableName);
	}

	public List findBySql(String sql, List params, Class dtoClass)
			throws AppException {
		return this.bbaBaseDAO.findBySql(sql, params, dtoClass);
	}

	public VouDTO edit(VouDTO vouDTO) throws AppException {
		return this.bbaBaseDAO.edit(vouDTO);
	}

	public VouDTO findOriDTO(VouDTO vouDTO) throws AppException {
		return this.bbaBaseDAO.findOriDTO(vouDTO);
	}

	public List updateMain(List vouList) throws AppException {
		return this.bbaBaseDAO.updateMain(vouList);
	}

	public PaginationDTO findSources(int menuid, String conditions,
			String orderBy, PaginationDTO page) throws AppException {
		String tableCode = this.bbaBaseDAO.getMainTableName();
		MenuDTO menu = this.menuBPO.findMenubyMenuid(menuid);
		if ((menu != null) && (menu.getTablecode() != null)) {
			tableCode = menu.getTablecode();
		}
		String where = this.appUtil.createAllWhere(menuid, null, conditions,
				tableCode);
		return findSources(page, where, orderBy);
	}

	public PaginationDTO findVous(int menuid, List querylist, List stepidList,
			PaginationDTO page, String sqlWhere, String orderBy)
			throws AppException {
		String tableCode = this.bbaBaseDAO.getMainTableName();
		MenuDTO menu = this.menuBPO.findMenubyMenuid(menuid);
		if (menu.getTablecode() != null) {
			tableCode = menu.getTablecode();
		}
		String where = this.appUtil.createAllWhere(menuid, stepidList,
				sqlWhere, tableCode);
		page = this.bbaBaseDAO.findVous(page, where, orderBy);
		return page;
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

	public VouDTO instanceMainDTO() throws AppException {
		Class dtoClass = this.bbaBaseDAO.getDtoClass();
		if (dtoClass != null) {
			try {
				return (VouDTO) dtoClass.newInstance();
			} catch (Exception e) {
				throw new AppException("0", "获取DTO实例失败 ");
			}
		}
		return null;
	}

	public VouDTO instanceSubDTO() throws AppException {
		Class dtoClass = this.bbaBaseDAO.getSubDtoClass();
		if (dtoClass != null) {
			try {
				return (VouDTO) dtoClass.newInstance();
			} catch (Exception e) {
				throw new AppException("0", "获取DTO实例失败 ");
			}
		}
		return null;
	}

	public List createVou(List vouList) throws AppException {
		vouList = initWf(vouList);
		List list = new ArrayList();
		VouDTO mainDTO = null;
		for (Iterator it = vouList.iterator(); it.hasNext();) {
			WfContextDTO wfContextDTO = (WfContextDTO) it.next();
			mainDTO = (VouDTO) wfContextDTO.getVoucher();
			init(1, wfContextDTO, mainDTO);
			setBillcode(mainDTO);
			mainDTO.setUserid(SecureUtil.getCurrentUser().getUserid());
			list.add(mainDTO);
		}
		doPreCreate(list);
		list = this.bbaBaseDAO.create(list);
		for (Iterator it = list.iterator(); it.hasNext();) {
			VouDTO vouDTO = (VouDTO) it.next();
			if (isAccount(vouDTO)) {
				doWayCtrl(vouDTO);
			}
		}
		doPostCreate(list);

		doCreateCommLog(vouList);
		return vouList;
	}

	public List updateVou(List vouList) throws AppException {
		vouList = initWf(vouList);
		if ((vouList == null) || (vouList.size() == 0)) {
			return vouList;
		}
		List list = new ArrayList();
		for (Iterator it = vouList.iterator(); it.hasNext();) {
			WfContextDTO wfContextDTO = (WfContextDTO) it.next();
			VouDTO vouDTO = (VouDTO) wfContextDTO.getVoucher();
			vouDTO.setTableName(this.bbaBaseDAO.getMainTableName());
			init(2, wfContextDTO, vouDTO);
			list.add(vouDTO);
		}

		doPreUpdate(list);
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			VouDTO vouDTO = (VouDTO) iterator.next();
			vouDTO = this.bbaBaseDAO.edit(vouDTO);
			if (isAccount(vouDTO)) {
				doUpdateWayCtrl(vouDTO);
			}
		}
		doPostUpdate(list);
		doCreateCommLog(vouList);
		return vouList;
	}

	public List deleteVou(List vouList) throws AppException {
		vouList = initWf(vouList);
		List list = new ArrayList();
		for (Iterator it = vouList.iterator(); it.hasNext();) {
			WfContextDTO wfContextDTO = (WfContextDTO) it.next();
			VouDTO vouDTO = (VouDTO) wfContextDTO.getVoucher();
			vouDTO.setTableName(this.bbaBaseDAO.getMainTableName());
			init(2, wfContextDTO, vouDTO);
			if (isAccount(vouDTO)) {
				doDelCtrl(vouDTO);
			}
			list.add(vouDTO);
		}
		this.bbaBaseDAO.delete(list);
		doPreDelete(list);
		return vouList;
	}

	public List auditVou(List vouList) throws AppException {
		vouList = initWf(vouList);
		if ((vouList == null) || (vouList.size() == 0)) {
			return vouList;
		}
		if (super.checkCancel(new ArrayList(vouList))) {
			vouList = super.findLogList(vouList,
					new String[] { this.bbaBaseDAO.getMainTableName(),
							this.bbaBaseDAO.getSubTableName() },
					this.bbaBaseDAO.isMainSub());
			checkRefData(vouList);
		}

		List list = new ArrayList();
		for (Iterator it = vouList.iterator(); it.hasNext();) {
			WfContextDTO wfContextDTO = (WfContextDTO) it.next();
			VouDTO vouDTO = (VouDTO) wfContextDTO.getVoucher();
			vouDTO.setTableName(this.bbaBaseDAO.getMainTableName());
			init(4, wfContextDTO, vouDTO);
			if (isAccount(vouDTO)) {
				doEndCtrl(vouDTO);
			}
			list.add(vouDTO);
		}

		doPreAudit(list);
		doUpdateAudit(list);
		doPostAudit(list);
		doCreateCommLog(vouList);
		sendRemoteVou(list);
		return vouList;
	}

	public List sendRemoteVou(List vouList) throws AppException {
		return new ArrayList();
	}

	public void doPreCreate(List vouList) throws AppException {
	}

	public void doPostCreate(List vouList) throws AppException {
	}

	public void doPreDelete(List vouList) throws AppException {
	}

	public void doPreUpdate(List vouList) throws AppException {
	}

	public void doPostUpdate(List vouList) throws AppException {
	}

	public void doPreAudit(List vouList) throws AppException {
	}

	public void doPostAudit(List vouList) throws AppException {
	}

	public List doUpdateAudit(List vouList) throws AppException {
		return this.bbaBaseDAO.updateMain(vouList);
	}

	public void checkRefData(List vouList) throws AppException {
	}

	protected boolean isAccount(VouDTO vouDTO) throws AppException {
		return vouDTO.getAccountnode() != null;
	}

	protected void setBillcode(VouDTO vouDTO) throws AppException {
		vouDTO.setBillcode(this.paService.getVchSerialRuleID(vouDTO));
	}

	protected void doCreateCommLog(List vouList) throws AppException {
		doCommLog(vouList, new String[] { this.bbaBaseDAO.getMainTableName(),
				this.bbaBaseDAO.getSubTableName() }, 1,
				this.bbaBaseDAO.isMainSub());
	}

	public void doWayCtrl(VouDTO vouDTO) throws AppException {
	}

	public void doUpdateWayCtrl(VouDTO vouDTO) throws AppException {
	}

	public void doDelCtrl(VouDTO vouDTO) throws AppException {
	}

	public void doEndCtrl(VouDTO vouDTO) throws AppException {
	}

	public void doWayEndCtrl(VouDTO vouDTO) throws AppException {
	}

	public List abolishVou(List vouList) throws AppException {
		vouList = initWf(vouList);
		List list = new ArrayList();
		for (Iterator it = vouList.iterator(); it.hasNext();) {
			WfContextDTO wfContextDTO = (WfContextDTO) it.next();
			VouDTO vouDTO = (VouDTO) wfContextDTO.getVoucher();
			vouDTO.setTableName(this.bbaBaseDAO.getMainTableName());
			init(4, wfContextDTO, vouDTO);
			if (isAccount(vouDTO)) {
				doDelCtrl(vouDTO);
			}
			list.add(vouDTO);
		}

		doUpdateAudit(list);

		doCreateCommLog(vouList);
		return vouList;
	}

	public String[] getField() throws AppException {
		VoucherTypeDTO vchtypeDTO = this.paService
				.findVchTypeByVchCode("09004");
		List list = this.vchComRuleTypeBPO.findVchComRuleType(
				vchtypeDTO.getVchtypeid(), vchtypeDTO.getVchtypeid());
		if ((list == null) || (list.size() == 0)) {
			throw new AppException("80033");
		}
		VchComRuleTypeDTO vchComRuleType = (VchComRuleTypeDTO) list.get(0);

		Collection comrules = this.vchComRuleBPO
				.findComRuleByCond("comruletypeid = "
						+ vchComRuleType.getComruletypeid()
						+ " ORDER BY isdefault");
		String[] fieldarr = null;
		for (Iterator comruleIt = comrules.iterator(); comruleIt.hasNext();) {
			VchComRuleDTO vchComRule = (VchComRuleDTO) comruleIt.next();
			List rulelist = this.comcfgservice.findRuleComItem(vchComRule
					.getComruleid().intValue());
			int size = rulelist.size();
			fieldarr = new String[size];
			for (int i = 0; i < size; ++i) {
				RuleComCfgDTO rule = (RuleComCfgDTO) rulelist.get(i);

				String ruleCode = rule.getFromelementcode().toLowerCase();

				int rulelevel = rule.getMatchtypeid();

				fieldarr[i] = getFieldByCode(ruleCode, getMainTableName(),
						rulelevel);
			}
		}
		return fieldarr;
	}

	public String getFieldByCode(String rulecode, String tableCode,
			int ruleLevel) throws AppException {
		List columns = this.dicService.findColumnByTableCode(tableCode);
		if (columns == null) {
			return rulecode;
		}

		int size = columns.size();
		for (int i = 0; i < size; ++i) {
			ColumnDTO column = (ColumnDTO) columns.get(i);
			if (rulecode.equalsIgnoreCase(column.getSourceelement())) {
				return column.getColumncode().toLowerCase();
			}
		}

		HashMap errMap = new HashMap();
		errMap.put("m", rulecode);
		throw new AppException("90097", errMap, "");
	}

	public String getValue(Object dto, String field) throws AppException {
		String value = null;
		try {
			value = BeanUtils.getProperty(dto, field.toLowerCase());
		} catch (IllegalAccessException e) {
			throw new AppException("90093");
		} catch (InvocationTargetException e) {
			throw new AppException("90094");
		} catch (NoSuchMethodException e) {
			throw new AppException("90095");
		}
		return value;
	}

	public List findCtrl(String whereSql) throws AppException {
		return this.bbaBaseDAO.findCtrl(whereSql, "");
	}

	public List findSource(VouDTO mainDTO) throws AppException {
		PaginationDTO page = new PaginationDTO();
		page.setAllflag(1);
		StringBuffer condition = new StringBuffer();
		String sourceidcolumn = this.bbaBaseDAO.getSourceid();
		if ((sourceidcolumn != null) && (!sourceidcolumn.equals(""))) {
			int sourceid = DTOUtil.getInt(mainDTO, sourceidcolumn);
			condition.append("billid=").append(sourceid);
			page = findSources(page, condition.toString(), "");
			if (page.getResult() != null) {
				for (Iterator iterator = page.getResult().iterator(); iterator
						.hasNext();) {
					VouDTO sourceDTO = (VouDTO) iterator.next();
					sourceDTO.setCurbal(sourceDTO.getCurbal().add(
							mainDTO.getAmt()));
				}
				return page.getResult();
			}
		}
		return new ArrayList();
	}

	public List findDetails(VouDTO mainDTO) throws AppException {
		if ((this.sourceDAO != null) && (this.hasSub)) {
			String sourceidcolumn = this.bbaBaseDAO.getSourceid();
			if ((sourceidcolumn != null) && (!sourceidcolumn.equals(""))) {
				int sourceid = DTOUtil.getInt(mainDTO, sourceidcolumn);
				return this.sourceDAO.findSubs(sourceid,
						this.sourceSubTableName);
			}
			return null;
		}
		return this.bbaBaseDAO.findSubs(mainDTO.getBillid());
	}

	public List showGatherAccountNo(String condition) throws AppException {
		return this.bbaBaseDAO.findGatherAccountNo(condition);
	}

	public List findCtrl(String whereSql, String whereSql2) throws AppException {
		return this.bbaBaseDAO.findCtrl(whereSql, whereSql2);
	}
}