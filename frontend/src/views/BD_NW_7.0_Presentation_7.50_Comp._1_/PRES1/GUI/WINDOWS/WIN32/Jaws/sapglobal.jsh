
/*
 * Header file for SAPGUI containing global definitions.
 *
 * Copyright
 *   SAP AG, www.sap.com
 *   Last Update : 2013/09/24
 */

Const
  sSapGuiConfiguration="sapfront",
  sSapGuiStatusBarName="sbar",
  sSapGuiStatusBarType="GuiStatusbar",
  sSapGuiOkCodeFieldName="okcd",
  sSapGuiOkCodeFieldType="GuiOkCodeField",
  sConfWinword="Microsoft Word",
  sConfExcel="Microsoft Excel",
  sConfPowerpoint="Microsoft PowerPoint",
  sConfProject="Microsoft Project",
  sConfWordperfect="WordPerfect 11",
  sConfAdobeAcrobat="Adobe Acrobat",
  sConfInternetExplorer="Internet Explorer",
  sConfNWBC="NWBC",
  sClassInternetExplorer="Internet Explorer_Server",
  sClassIEFrame="IEFrame",
  sClassAcrobatReader="AVL_AVView",
  sClassToolbarWindow32="ToolbarWindow32",
  sClassDialogContainer="DialogBox Container Class",
  sClassSapFrontend="SAP_FRONTEND_SESSION",
  sClassSapEmbeddedFrontend="SAP_FRONTEND_EMBEDDED"

/*
 * Global variables
 */

globals
  string g_sPreviousConfiguration,
  object g_oSAPGUI,
  object g_oSAPGUISession,
  object g_oSAPGUIFrame,
  object oNull,
  handle hNull
