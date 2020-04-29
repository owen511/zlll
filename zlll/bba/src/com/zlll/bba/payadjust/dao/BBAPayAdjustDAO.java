package com.zlll.bba.payadjust.dao;

import com.zlll.bba.base.dao.BBABaseDAO;
import com.zlll.bba.payadjust.dto.BBAPayAdjustDTO;
import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.fasp.pa.IPaService;
import gov.mof.framework.util.DTOUtil;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

public class BBAPayAdjustDAO extends BBABaseDAO implements IBBAPayAdjustDAO {
	private String detailTableName;
	private String subDetailTableName;
	protected IPaService paService = null;

	public IPaService getPaService() {
		return this.paService;
	}

	public void setPaService(IPaService paService) {
		this.paService = paService;
	}

	public String getDetailTableName() {
		return this.detailTableName;
	}

	public void setDetailTableName(String detailTableName) {
		this.detailTableName = detailTableName;
	}

	public String getSubDetailTableName() {
		return this.subDetailTableName;
	}

	public void setSubDetailTableName(String subDetailTableName) {
		this.subDetailTableName = subDetailTableName;
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
		insertSubDetails(vouDTO, ((BBAPayAdjustDTO) vouDTO).getSubDetails());
		return vouDTO;
	}

	public void insertSubDetails(VouDTO mainDTO, List subDetails)
			throws AppException {
		for (Iterator subIt = subDetails.iterator(); subIt.hasNext();) {
			VouDTO subDTO = (VouDTO) subIt.next();
			subDTO.setTableName(this.detailTableName);
			if (subDTO.getBillid() == 0) {
				subDTO.setBillid(getSequence());
			}

			subDTO.setBillcode(this.paService.getVchSerialRuleID(mainDTO));
			DTOUtil.setValue(subDTO, getForeignid(),
					new Integer(mainDTO.getBillid()));
			HashMap subHm = DTOUtil.Object2HashMap(subDTO);
			insertData(subHm);
		}
	}
}