package com.zlll.bba.plandown.bo;

import gov.mof.fasp.AppException;
import gov.mof.fasp.ifmis.common.dto.VouDTO;
import gov.mof.fasp.ifmis.system.importmod.format.dto.ImportFormatDTO;
import gov.mof.fasp.sec.util.SecureUtil;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import com.zlll.bba.base.dto.BBABaseDTO;
import com.zlll.bba.plan.bo.BBAPlanBO;
import com.zlll.bba.plandown.dao.IBBAPlanDownDAO;
import com.zlll.bba.plandown.dto.BBAPlanDownDTO;

public class BBAPlanDownBO extends BBAPlanBO implements IBBAPlanDownBO {
	private IBBAPlanDownDAO bbaPlanDownDAO;

	public IBBAPlanDownDAO getBbaPlanDownDAO() {
		return this.bbaPlanDownDAO;
	}

	public void setBbaPlanDownDAO(IBBAPlanDownDAO bbaPlanDownDAO) {
		this.bbaPlanDownDAO = bbaPlanDownDAO;
	}

	public Collection importXlsData(ImportFormatDTO importFormatDTO,
			int userId, List importList) throws AppException {
		List mainDTOList = new ArrayList();
		for (int i = 0; i < importList.size(); ++i) {
			HashMap hm = (HashMap) importList.get(i);
			BBAPlanDownDTO planDownDTO = new BBAPlanDownDTO();
			try {
				BeanUtils.populate(planDownDTO, hm);
			} catch (IllegalAccessException e1) {
				e1.printStackTrace();
			} catch (InvocationTargetException e1) {
				e1.printStackTrace();
			}
			mainDTOList.add(planDownDTO);
		}

		if (mainDTOList.size() > 0) {
			try {
				this.wfService.doAction2(1, false, SecureUtil.getAuthUser()
						.getAccuserid(), mainDTOList);
			} catch (AppException e) {
				throw new AppException("0", "执行工作流，产生指标单据失败");
			}
		}
		return null;
	}

	public void doEndCtrl(VouDTO vouDTO) throws AppException {
		BBABaseDTO baseDTO = (BBABaseDTO) vouDTO;
		baseDTO.setElement01(0);
		baseDTO.setCuramt(baseDTO.getAmt());
		baseDTO.setEndamt(baseDTO.getAmt());

		getBbaBaseDAO().doGenerateCtrl("T_BBA_CTRL", baseDTO);
	}
}