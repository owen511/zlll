package com.zlll.bba.base.dto;

import gov.mof.fasp.ifmis.common.dto.VouDTO;

import java.math.BigDecimal;
import java.util.Calendar;

import com.zlll.bba.tools.FormatUtil;

public class BBABaseDTO extends VouDTO {
	private static final long serialVersionUID = -696270150361759705L;
	Calendar calendar = Calendar.getInstance();
	private int accountid;
	private String accountname;
	private String accountno;
	private String frombankno;
	private int budgetagency;
	private int budgetdepartment;
	private int budgetbusinessdept;
	private int budgetsource;
	private int budgeteconomicclass;
	private int budgetfuncclass;
	private int budgetproj;
	private int budgetincometype;
	private String digest;
	private int element01;
	private int element02;
	private int element03;
	private int element04;
	private int element05;
	private int element06;
	private int element07;
	private int element08;
	private int element09;
	private int element10;
	private int element11;
	private int element12;
	private int element13;
	private int element14;
	private int element15;
	private int element16;
	private int element17;
	private int element18;
	private int element19;
	private int element20;
	private BigDecimal amt = new BigDecimal("0.00");

	private BigDecimal initamt = new BigDecimal("0.00");

	private BigDecimal curamt = new BigDecimal("0.00");

	private BigDecimal endamt = new BigDecimal("0.00");

	private BigDecimal amt01 = new BigDecimal("0.00");

	private BigDecimal amt02 = new BigDecimal("0.00");

	private BigDecimal amt03 = new BigDecimal("0.00");

	private BigDecimal amt04 = new BigDecimal("0.00");

	private BigDecimal amt05 = new BigDecimal("0.00");

	private BigDecimal amt06 = new BigDecimal("0.00");

	private BigDecimal amt07 = new BigDecimal("0.00");

	private BigDecimal amt08 = new BigDecimal("0.00");

	private BigDecimal amt09 = new BigDecimal("0.00");

	private BigDecimal amt10 = new BigDecimal("0.00");

	private BigDecimal amt11 = new BigDecimal("0.00");

	private BigDecimal amt12 = new BigDecimal("0.00");

	private BigDecimal amt13 = new BigDecimal("0.00");

	private BigDecimal amt14 = new BigDecimal("0.00");

	private BigDecimal amt15 = new BigDecimal("0.00");

	private BigDecimal amt16 = new BigDecimal("0.00");

	private BigDecimal amt17 = new BigDecimal("0.00");

	private BigDecimal amt18 = new BigDecimal("0.00");

	private BigDecimal amt19 = new BigDecimal("0.00");

	private BigDecimal amt20 = new BigDecimal("0.00");
	private String text01;
	private String text02;
	private String text03;
	private String text04;
	private String text05;
	private String text06;
	private String text07;
	private String text08;
	private String text09;
	private String text10;
	private String text11;
	private String text12;
	private String text13;
	private String text14;
	private String text15;
	private String text16;
	private String text17;
	private String text18;
	private String text19;
	private String text20;
	private int govid;
	private int govyear;
	private int tempid;
	private BigDecimal tempamt = new BigDecimal("0.00");

	public void copyTo(BBABaseDTO target) {
		target.accountid = this.accountid;
		target.accountname = this.accountname;
		target.accountno = this.accountno;
		target.budgetagency = this.budgetagency;
		target.budgetbusinessdept = this.budgetbusinessdept;
		target.budgetdepartment = this.budgetdepartment;
		target.budgeteconomicclass = this.budgeteconomicclass;
		target.budgetfuncclass = this.budgetfuncclass;
		target.budgetincometype = this.budgetincometype;
		target.budgetproj = this.budgetproj;
		target.budgetsource = this.budgetsource;
		target.element01 = this.element01;
		target.element02 = this.element02;
		target.element03 = this.element03;
		target.element04 = this.element04;
		target.element05 = this.element05;
		target.element06 = this.element06;
		target.element07 = this.element07;
		target.element08 = this.element08;
		target.element09 = this.element09;
		target.element10 = this.element10;
		target.element11 = this.element11;
		target.element12 = this.element12;
		target.element13 = this.element13;
		target.element14 = this.element14;
		target.element15 = this.element15;
		target.element16 = this.element16;
		target.element17 = this.element17;
		target.element18 = this.element18;
		target.element19 = this.element19;
		target.element20 = this.element20;
		target.digest = this.digest;

		target.text01 = this.text01;
		target.text02 = this.text02;
		target.text03 = this.text03;
		target.text04 = this.text04;
		target.text05 = this.text05;
		target.text06 = this.text06;
		target.text07 = this.text07;
		target.text08 = this.text08;
		target.text09 = this.text09;
		target.text10 = this.text10;
		target.text11 = this.text11;
		target.text12 = this.text12;
		target.text13 = this.text13;
		target.text14 = this.text14;
		target.text15 = this.text15;
		target.text16 = this.text16;
		target.text17 = this.text17;
		target.text18 = this.text18;
		target.text19 = this.text19;
		target.text20 = this.text20;
		target.payno = this.payno;
	}

	public int getAccountid() {
		return this.accountid;
	}

	public void setAccountid(int accountid) {
		this.accountid = accountid;
	}

	public String getAccountname() {
		return this.accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getAccountno() {
		return this.accountno;
	}

	public void setAccountno(String accountno) {
		this.accountno = accountno;
	}

	public String getFrombankno() {
		return this.frombankno;
	}

	public void setFrombankno(String frombankno) {
		this.frombankno = frombankno;
	}

	public int getBudgetagency() {
		return this.budgetagency;
	}

	public void setBudgetagency(int budgetagency) {
		this.budgetagency = budgetagency;
	}

	public int getBudgetdepartment() {
		return this.budgetdepartment;
	}

	public void setBudgetdepartment(int budgetdepartment) {
		this.budgetdepartment = budgetdepartment;
	}

	public int getBudgetbusinessdept() {
		return this.budgetbusinessdept;
	}

	public void setBudgetbusinessdept(int budgetbusinessdept) {
		this.budgetbusinessdept = budgetbusinessdept;
	}

	public int getBudgetsource() {
		return this.budgetsource;
	}

	public void setBudgetsource(int budgetsource) {
		this.budgetsource = budgetsource;
	}

	public int getBudgeteconomicclass() {
		return this.budgeteconomicclass;
	}

	public void setBudgeteconomicclass(int budgeteconomicclass) {
		this.budgeteconomicclass = budgeteconomicclass;
	}

	public int getBudgetfuncclass() {
		return this.budgetfuncclass;
	}

	public void setBudgetfuncclass(int budgetfuncclass) {
		this.budgetfuncclass = budgetfuncclass;
	}

	public int getBudgetproj() {
		return this.budgetproj;
	}

	public void setBudgetproj(int budgetproj) {
		this.budgetproj = budgetproj;
	}

	public int getBudgetincometype() {
		return this.budgetincometype;
	}

	public void setBudgetincometype(int budgetincometype) {
		this.budgetincometype = budgetincometype;
	}

	public String getDigest() {
		return this.digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
	}

	public int getElement01() {
		return this.element01;
	}

	public void setElement01(int element01) {
		this.element01 = element01;
	}

	public int getElement02() {
		return this.element02;
	}

	public void setElement02(int element02) {
		this.element02 = element02;
	}

	public int getElement03() {
		return this.element03;
	}

	public void setElement03(int element03) {
		this.element03 = element03;
	}

	public int getElement04() {
		return this.element04;
	}

	public void setElement04(int element04) {
		this.element04 = element04;
	}

	public int getElement05() {
		return this.element05;
	}

	public void setElement05(int element05) {
		this.element05 = element05;
	}

	public int getElement06() {
		return this.element06;
	}

	public void setElement06(int element06) {
		this.element06 = element06;
	}

	public int getElement07() {
		return this.element07;
	}

	public void setElement07(int element07) {
		this.element07 = element07;
	}

	public int getElement08() {
		return this.element08;
	}

	public void setElement08(int element08) {
		this.element08 = element08;
	}

	public int getElement09() {
		return this.element09;
	}

	public void setElement09(int element09) {
		this.element09 = element09;
	}

	public int getElement10() {
		return this.element10;
	}

	public void setElement10(int element10) {
		this.element10 = element10;
	}

	public int getElement11() {
		return this.element11;
	}

	public void setElement11(int element11) {
		this.element11 = element11;
	}

	public int getElement12() {
		return this.element12;
	}

	public void setElement12(int element12) {
		this.element12 = element12;
	}

	public int getElement13() {
		return this.element13;
	}

	public void setElement13(int element13) {
		this.element13 = element13;
	}

	public int getElement14() {
		return this.element14;
	}

	public void setElement14(int element14) {
		this.element14 = element14;
	}

	public int getElement15() {
		return this.element15;
	}

	public void setElement15(int element15) {
		this.element15 = element15;
	}

	public int getElement16() {
		return this.element16;
	}

	public void setElement16(int element16) {
		this.element16 = element16;
	}

	public int getElement17() {
		return this.element17;
	}

	public void setElement17(int element17) {
		this.element17 = element17;
	}

	public int getElement18() {
		return this.element18;
	}

	public void setElement18(int element18) {
		this.element18 = element18;
	}

	public int getElement19() {
		return this.element19;
	}

	public void setElement19(int element19) {
		this.element19 = element19;
	}

	public int getElement20() {
		return this.element20;
	}

	public void setElement20(int element20) {
		this.element20 = element20;
	}

	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public BigDecimal getInitamt() {
		return this.initamt;
	}

	public void setInitamt(BigDecimal initamt) {
		this.initamt = initamt;
	}

	public BigDecimal getCuramt() {
		return this.curamt;
	}

	public void setCuramt(BigDecimal curamt) {
		this.curamt = curamt;
	}

	public BigDecimal getEndamt() {
		return this.endamt;
	}

	public void setEndamt(BigDecimal endamt) {
		this.endamt = endamt;
	}

	public BigDecimal getAmt01() {
		return this.amt01;
	}

	public void setAmt01(BigDecimal amt01) {
		this.amt01 = amt01;
	}

	public BigDecimal getAmt02() {
		return this.amt02;
	}

	public void setAmt02(BigDecimal amt02) {
		this.amt02 = amt02;
	}

	public BigDecimal getAmt03() {
		return this.amt03;
	}

	public void setAmt03(BigDecimal amt03) {
		this.amt03 = amt03;
	}

	public BigDecimal getAmt04() {
		return this.amt04;
	}

	public void setAmt04(BigDecimal amt04) {
		this.amt04 = amt04;
	}

	public BigDecimal getAmt05() {
		return this.amt05;
	}

	public void setAmt05(BigDecimal amt05) {
		this.amt05 = amt05;
	}

	public BigDecimal getAmt06() {
		return this.amt06;
	}

	public void setAmt06(BigDecimal amt06) {
		this.amt06 = amt06;
	}

	public BigDecimal getAmt07() {
		return this.amt07;
	}

	public void setAmt07(BigDecimal amt07) {
		this.amt07 = amt07;
	}

	public BigDecimal getAmt08() {
		return this.amt08;
	}

	public void setAmt08(BigDecimal amt08) {
		this.amt08 = amt08;
	}

	public BigDecimal getAmt09() {
		return this.amt09;
	}

	public void setAmt09(BigDecimal amt09) {
		this.amt09 = amt09;
	}

	public BigDecimal getAmt10() {
		return this.amt10;
	}

	public void setAmt10(BigDecimal amt10) {
		this.amt10 = amt10;
	}

	public BigDecimal getAmt11() {
		return this.amt11;
	}

	public void setAmt11(BigDecimal amt11) {
		this.amt11 = amt11;
	}

	public BigDecimal getAmt12() {
		return this.amt12;
	}

	public void setAmt12(BigDecimal amt12) {
		this.amt12 = amt12;
	}

	public BigDecimal getAmt13() {
		return this.amt13;
	}

	public void setAmt13(BigDecimal amt13) {
		this.amt13 = amt13;
	}

	public BigDecimal getAmt14() {
		return this.amt14;
	}

	public void setAmt14(BigDecimal amt14) {
		this.amt14 = amt14;
	}

	public BigDecimal getAmt15() {
		return this.amt15;
	}

	public void setAmt15(BigDecimal amt15) {
		this.amt15 = amt15;
	}

	public BigDecimal getAmt16() {
		return this.amt16;
	}

	public void setAmt16(BigDecimal amt16) {
		this.amt16 = amt16;
	}

	public BigDecimal getAmt17() {
		return this.amt17;
	}

	public void setAmt17(BigDecimal amt17) {
		this.amt17 = amt17;
	}

	public BigDecimal getAmt18() {
		return this.amt18;
	}

	public void setAmt18(BigDecimal amt18) {
		this.amt18 = amt18;
	}

	public BigDecimal getAmt19() {
		return this.amt19;
	}

	public void setAmt19(BigDecimal amt19) {
		this.amt19 = amt19;
	}

	public BigDecimal getAmt20() {
		return this.amt20;
	}

	public void setAmt20(BigDecimal amt20) {
		this.amt20 = amt20;
	}

	public String getText01() {
		return this.text01;
	}

	public void setText01(String text01) {
		this.text01 = text01;
	}

	public String getText02() {
		return this.text02;
	}

	public void setText02(String text02) {
		this.text02 = text02;
	}

	public String getText03() {
		return this.text03;
	}

	public void setText03(String text03) {
		this.text03 = text03;
	}

	public String getText04() {
		return this.text04;
	}

	public void setText04(String text04) {
		this.text04 = text04;
	}

	public String getText05() {
		return this.text05;
	}

	public void setText05(String text05) {
		this.text05 = text05;
	}

	public String getText06() {
		return this.text06;
	}

	public void setText06(String text06) {
		this.text06 = text06;
	}

	public String getText07() {
		return this.text07;
	}

	public void setText07(String text07) {
		this.text07 = text07;
	}

	public String getText08() {
		return this.text08;
	}

	public void setText08(String text08) {
		this.text08 = text08;
	}

	public String getText09() {
		return this.text09;
	}

	public void setText09(String text09) {
		this.text09 = text09;
	}

	public String getText10() {
		return this.text10;
	}

	public void setText10(String text10) {
		this.text10 = text10;
	}

	public String getText11() {
		return this.text11;
	}

	public void setText11(String text11) {
		this.text11 = text11;
	}

	public String getText12() {
		return this.text12;
	}

	public void setText12(String text12) {
		this.text12 = text12;
	}

	public String getText13() {
		return this.text13;
	}

	public void setText13(String text13) {
		this.text13 = text13;
	}

	public String getText14() {
		return this.text14;
	}

	public void setText14(String text14) {
		this.text14 = text14;
	}

	public String getText15() {
		return this.text15;
	}

	public void setText15(String text15) {
		this.text15 = text15;
	}

	public String getText16() {
		return this.text16;
	}

	public void setText16(String text16) {
		this.text16 = text16;
	}

	public String getText17() {
		return this.text17;
	}

	public void setText17(String text17) {
		this.text17 = text17;
	}

	public String getText18() {
		return this.text18;
	}

	public void setText18(String text18) {
		this.text18 = text18;
	}

	public String getText19() {
		return this.text19;
	}

	public void setText19(String text19) {
		this.text19 = text19;
	}

	public String getText20() {
		return this.text20;
	}

	public void setText20(String text20) {
		this.text20 = text20;
	}

	public int getGovid() {
		return this.govid;
	}

	public void setGovid(int govid) {
		this.govid = govid;
	}

	public int getGovyear() {
		return this.govyear;
	}

	public void setGovyear(int govyear) {
		this.govyear = Integer.parseInt(FormatUtil.yearFormat
				.format(this.calendar.getTime()));
	}

	public int getTempid() {
		return this.tempid;
	}

	public void setTempid(int tempid) {
		this.tempid = tempid;
	}

	public BigDecimal getTempamt() {
		return this.tempamt;
	}

	public void setTempamt(BigDecimal tempamt) {
		this.tempamt = tempamt;
	}
}