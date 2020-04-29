package com.zlll.bba.remoting.util;

import gov.mof.fasp.AppException;
import gov.mof.fasp.sec.user.bpo.IUserIdentityService;
import gov.mof.framework.remoting.httpinvoker.HttpInvokerExRequestExecutor;
import java.net.MalformedURLException;
import org.springframework.remoting.RemoteAccessException;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;

public class ZlllHttpInvokeFactory {
	private static HttpInvokerProxyFactoryBean getHttpInvoerProxyFactoryBean(
			Class serviceInterface, String serverUrl, boolean zip) {
		HttpInvokerProxyFactoryBean factory = new HttpInvokerProxyFactoryBean();
		HttpInvokerExRequestExecutor httpInvokerExRequestExecutor = new HttpInvokerExRequestExecutor();
		httpInvokerExRequestExecutor.setZip(zip);
		factory.setHttpInvokerRequestExecutor(httpInvokerExRequestExecutor);
		factory.setServiceInterface(serviceInterface);
		factory.setServiceUrl(serverUrl);
		return factory;
	}

	public boolean invokerLogin(String remoteAddr, String remoteUserName,
			String remotePwd, String remoteYear) throws AppException {
		Object remoteObj = getIRemoteInterface(IUserIdentityService.class,
				remoteAddr, "/SEC/UserAuthService");
		IUserIdentityService obj = (IUserIdentityService) remoteObj;
		try {
			obj.login(remoteUserName, remotePwd, remoteYear);
			return true;
		} catch (RemoteAccessException e) {
			throw new AppException("0", "无法与远程服务器握手，请联系管理员！");
		} catch (Exception e) {
			throw new AppException("0", e.getMessage());
		}
	}

	public Object getIRemoteInterface(Class serviceInterface,
			String remoteAddr, String remoteUri) throws AppException {
		String url = "http://" + remoteAddr + "/remoting" + remoteUri;
		HttpInvokerProxyFactoryBean factory = getHttpInvoerProxyFactoryBean(
				serviceInterface, url, false);
		try {
			factory.afterPropertiesSet();
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
		}

		return factory.getObject();
	}
}