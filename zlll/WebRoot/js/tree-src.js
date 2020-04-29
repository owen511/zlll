/**
 * @fileoverview Zapatec Tree widget. Include this file in your HTML page.
 * Includes base Zapatec Tree submodules: zptree-core.js, zptree-node.js,
 * zptree-utils.js
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: tree-src.js 1897 2007-11-16 01:47:51Z liujiaguang $ */

/**
 * Path to Zapatec Tree scripts.
 * @private
 */
Zapatec.treePath = Zapatec.getPath("Zapatec.TreeWidget");

// Include required scripts
Zapatec.Transport.include(Zapatec.treePath + 'tree-core.js', "Zapatec.Tree");
Zapatec.Transport.include(Zapatec.treePath + 'tree-node.js', "Zapatec.Tree.Node");
Zapatec.Transport.include(Zapatec.treePath + 'tree-utils.js');
