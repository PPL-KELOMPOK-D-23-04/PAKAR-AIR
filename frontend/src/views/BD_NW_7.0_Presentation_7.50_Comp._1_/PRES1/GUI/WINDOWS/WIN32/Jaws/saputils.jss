
/*
 * JAWS Script file for SAPGUI - Helper and utility functions
 *
 * Copyright
 *   SAP AG, www.sap.com
 *   Last Update : 2016/06/08
 */

include "HJConst.jsh"
include "HJGlobal.jsh"
include "HJHelp.jsh"
include "common.jsm"

include "sapfront.jsh"
include "sapfront.jsm"
include "sapglobal.jsh"

Const
  StartTimeout = 2
  
Globals
  int g_iControlGroupMode,
  int g_nScreenEchoMode,
  int g_nTypingEchoMode,
  int g_nGraphicsMode,
  int g_nControlTypeMode,
  int g_nNextConfiguationID,
  string g_sNextConfiguration,
  string g_sStartMessage,
  string g_sStartTutorMessage

Globals
  /* defs for progress bar announcement */
  int g_nProgressBarMode,
  int g_nProgressBarPercentage,
  int g_nProgressBarLastChange,
  string g_sProgressBarSound,
  string g_sProgressBarText,
  string g_sProgressBarPreviousText

/*
 **********************************************************************
 ** Some utility functions
 **********************************************************************
*/

;For compatibility with Jaws 6.2
int Function StringSegmentCount (string TheString, string Delimiter)
var
  int Position,
  int Count,
  int length

  If (GetJFWVersion () >= 700000) then
    return StringSegmentCount (TheString, Delimiter)
  EndIf

  let Length = StringLength (TheString)
  let Position = 1
  let Count = 0

  While (Position <= Length)
    IF (SubString (TheString, Position, 1) == Delimiter) THEN
      let Count = Count + 1
    ENDIF
    let Position = Position + 1
  EndWhile

  RETURN Count

EndFunction

string Function TrimString (string s)
var
  string sTmp,
  string sRes

  let sTmp = StringTrimLeadingBlanks (s)
  let sRes = StringTrimTrailingBlanks (sTmp)

  return (sRes)

EndFunction

int Function CompareStrings (string s1, string s2)

  if (StringLength (s1) != StringLength (s2)) then
    return false
  endif
    
  if (StringContains (s1, s2) == 0) then
    return false
  endif

  return true

EndFunction

/*
 **********************************************************************
 ** Initialization
 **********************************************************************
*/

void Function InitSAPUtils ()

  let g_iControlGroupMode = ShouldItemSpeak (OT_CONTROL_GROUP_NAME)
  let g_nScreenEchoMode = GetScreenEcho ()
  let g_nTypingEchoMode = GetJcfOption (OPT_TYPING_ECHO)
  let g_nGraphicsMode = GetJcfOption (OPT_INCLUDE_GRAPHICS)
  let g_nControlTypeMode = GetJcfOption (OT_CONTROL_TYPE)

  let g_nNextConfiguationID = 0
  let g_sStartMessage = ""
  let g_sStartTutorMessage = ""

  ; verbosity level functions

  let g_nSapGuiAccVerbosity = 1
  let g_nSapGuiSteploopMode = TRUE
  let g_nMultipleSelectionVerbosity = 0

  ; reset progress bar settings
  let g_nProgressBarPercentage = 0
  let g_nProgressBarLastChange = 0
  let g_sProgressBarText = ""
  let g_sProgressBarPreviousText = ""
  let g_sProgressBarSound = FindJAWSSoundFile ("Click6.wav")

  LoadApplicationSettings ()

EndFunction

/*
 **********************************************************************
 ** Speech functions
 **********************************************************************
*/

/*
 * ShouldItemSpeak
 */


int Function ShouldItemSpeak (int iOutputMode)
var
  int iGeneralMode

  if (iOutputMode == OT_CONTROL_GROUP_NAME) then
    if (g_iControlGroupMode == OFF) then
      return (OFF)
    endif
  endif

  let iGeneralMode = shouldItemSpeak (iOutputMode)

  return (iGeneralMode)

EndFunction

/*
 * SetLocalOutputMode
 */

void Function SetLocalOutputMode (int iOutputMode, int iSwitch)

  if (iOutputMode == OT_CONTROL_GROUP_NAME) then
    let g_iControlGroupMode = iSwitch
  endif

EndFunction

/*
 * Set/Reset screen/typing echo modes
 */

Void Function SetLocalScreenEchoMode (int nMode)
var
  int nCurMode

  let nCurMode = GetJcfOption (GUI_OPT_SCREEN_ECHO)
  if (nMode == nCurMode) then
    return
  endif
  let g_nScreenEchoMode = nCurMode
  SetJcfOption (GUI_OPT_SCREEN_ECHO, nMode)
EndFunction

Void Function SetLocalTypingEchoMode (int nMode)
var
  int nCurMode

  let nCurMode = GetJcfOption (OPT_TYPING_ECHO)
  if (nMode == nCurMode) then
    return
  endif
  let g_nTypingEchoMode = nCurMode
  SetJcfOption (OPT_TYPING_ECHO, nMode)
EndFunction

void Function SetLocalGraphicsMode (int nMode)
var
  int nCurMode

  let nCurMode = GetJcfOption (OPT_INCLUDE_GRAPHICS)
  if (nMode == nCurMode) then
    return
  endif
  let g_nGraphicsMode = nCurMode
  SetJcfOption (OPT_INCLUDE_GRAPHICS, nMode)
EndFunction

void Function ResetLocalGraphicsMode ()
  SetJcfOption (OPT_INCLUDE_GRAPHICS, g_nGraphicsMode)
EndFunction

void Function ResetLocalScreenEchoMode  ()
  SetJcfOption (GUI_OPT_SCREEN_ECHO, g_nScreenEchoMode)
EndFunction

void Function ResetLocalTypingEchoMode  ()
  SetJcfOption (OPT_TYPING_ECHO, g_nTypingEchoMode)
EndFunction

/*
 * Appplication settings
 */
 
int Function SaveApplicationSettings ()
var
  int iResult

  let iResult = iniWriteInteger (Section_SapGuiVerbositySettings, Key_SapGuiAccVerbosity, g_nSapGuiAccVerbosity, SapGuiJsiFileName)
  let iResult = iniWriteInteger (Section_SapGuiVerbositySettings, Key_SapGuiSteploopMode, g_nSapGuiSteploopMode, SapGuiJsiFileName)
  ; let g_nProgressBarMode = 1  /* announcement of progress bar through COM event (not recommended) */

  return iResult

EndFunction

int Function LoadApplicationSettings ()

  let g_nSapGuiAccVerbosity = iniReadInteger (Section_SapGuiVerbositySettings, Key_SapGuiAccVerbosity, g_nSapGuiAccVerbosity, SapGuiJsiFileName)
  let g_nSapGuiSteploopMode = iniReadInteger (Section_SapGuiVerbositySettings, Key_SapGuiSteploopMode, g_nSapGuiSteploopMode, SapGuiJsiFileName)

  /*
   * ROM 2011/09/19:
   * - the default setting does not use a COM event anymore, because it has caused frequent SAPGUI crashes
   * - use of COM event can be enabled via the key "ProgressBarAnnouncement" in settings file sapfront.jsi (but handle with care!)
   * ROM 2012/05/21:
   * - new SAPGUI properties are used to announce progress bar
   */
  let g_nProgressBarMode = iniReadInteger (Section_SapGuiVerbositySettings, Key_SapGuiProgressBarMode, 0, SapGuiJsiFileName)

  /*
   * Switch on/off kludge for multiple selection button (ROM 2013/11/28) - default is off
   */
   let g_nMultipleSelectionVerbosity = iniReadInteger (Section_SapGuiVerbositySettings, Key_SapGuiMultipleSelection, 0, SapGuiJsiFileName)

   return TRUE

EndFunction

/*
 **********************************************************************
 ** General SAPGUI functions
 **********************************************************************
*/

/*
 * SAPGUI Object
 */

Object Function GetSAPGUI ()
var
  handle hCurWnd,
  handle hActiveWnd,
  object oWrapper,
  object oRotSAPGUI,
  object oSAPGUI,
  int bFoundStandalone,
  int bFoundEmbedded,
  int nLevel,
  handle hAppWindow,
  handle hTopLevelWindow,
  handle hFocus,
  handle hFound,
  handle hRun,
  string sWindowClass,
  string sAppWindowClass

  let g_oSAPGUI = oNull

  let hFocus = GetFocus ()
  let hTopLevelWindow = GetTopLevelWindow (hFocus)
  let hAppWindow = GetAppMainWindow (hFocus)

  /*
    * changed logic for cases when dialogs are running embedded in BC (2016-01-18 rom)
    * another case added: ((hTopLevelWindow!=hAppWindow) && (hAppWindow==sClassSapFrontend))
    */

  let sWindowClass = GetWindowClass (hTopLevelWindow)
  let sAppWindowClass = GetWindowClass (hAppWindow)
  let bFoundStandalone = (CompareStrings (sWindowClass, sClassSapFrontend) || CompareStrings (sAppWindowClass, sClassSapFrontend))

  /*
  * Performance Assistant is not owned by another window, just check the window class
  */
  if (!bFoundStandalone) then
    bFoundStandalone = (CompareStrings (sWindowClass, sClassDialogContainer))
  endif

  if (!bFoundStandalone) then
    nLevel = 0
    while ((GetWindowClass (hAppWindow) == cWc_dlg32770) && (nLevel < 10))
      hAppWindow = GetAppMainWindow (hAppWindow)
      nLevel = nLevel + 1
    endwhile

    if ((hTopLevelWindow != hAppWindow) && (GetWindowClass (hTopLevelWindow) == cWc_dlg32770)) then
      if (CompareStrings (GetWindowClass (hAppWindow), sClassSapFrontend)) then
        let bFoundStandalone = true
      else
        let hFound = FindWindow (hAppWindow, sClassSapFrontend)
        if (hFound) then
          let bFoundStandalone = true
        endif
      endif
    endif
  endif

  ;  1. Try first to connect to a standalone SAPGUI  session
  if (bFoundStandalone) then
    let oRotSAPGUI = GetObject ("SAPGUI")
    if (!oRotSAPGUI) then
      oRotSAPGUI = GetObject ("SAPGUISERVER")
    endif
    if (!oRotSAPGUI) then
      let oWrapper = CreateObject ("SapROTWr.SapROTWrapper")
      if (oWrapper) then
        let oRotSAPGUI = oWrapper.GetROTEntry ("SAPGUI")
        if (!oRotSAPGUI) then
          oRotSAPGUI = oWrapper.GetROTEntry ("SAPGUISERVER")
        endif
      endif
      let oWrapper = oNull
    endif

    if (oRotSAPGUI) then
      let oSAPGUI = oRotSAPGUI.GetScriptingEngine
    endif

    let hActiveWnd = hNull
    if (oSAPGUI) then
      let hActiveWnd = oSAPGUI.ActiveSession.ActiveWindow.Handle
    endif

  else

    ;  2. No standalone session detected - try to connect to an embedded SAPGUISERVER session

    let bFoundEmbedded = false

    if ((hTopLevelWindow != hAppWindow) && (GetWindowClass (hTopLevelWindow) == cWc_dlg32770)) then
      let hFound = FindWindow (hAppWindow, sClassSapEmbeddedFrontend)
      if (hFound) then
        let bFoundEmbedded = true
      endif
    endif

    if (!bFoundEmbedded) then
      let hRun = hFocus
      while (hRun && !bFoundEmbedded)
        let sWindowClass = GetWindowClass (hRun)
        let bFoundEmbedded = (CompareStrings (sWindowClass, sClassSapEmbeddedFrontend))
        let hRun = GetParent (hRun)
      endwhile
    endif

    if (bFoundEmbedded) then
      let oSAPGUI = oNull
      let oRotSAPGUI = GetObject ("SAPGUISERVER")
      if (!oRotSAPGUI) then
        let oWrapper = CreateObject ("SapROTWr.SapROTWrapper")
        if (!oWrapper) then
          return oNull
        endif
        let oRotSAPGUI = oWrapper.GetROTEntry ("SAPGUISERVER")
        if (!oRotSAPGUI) then
          return oNull
        endif
        let oWrapper = oNull
      endif
      let oSAPGUI = oRotSAPGUI.GetScriptingEngine
      let hActiveWnd = hNull
      if (oSAPGUI) then
        let hActiveWnd = oSAPGUI.ActiveSession.ActiveWindow.Handle
      endif
    endif
  endif
 
  if (!oSAPGUI || !hActiveWnd) then
    return oNull
  endif

  let g_oSAPGUI = oSAPGUI
  return (oSAPGUI)

EndFunction

int Function IsSAPGUIActive ()
  if (!g_oSAPGUI) then
    return FALSE
  endif
  return TRUE
EndFunction

void Function ExitSAPGUI ()
  let g_oSAPGUIFrame = oNull
  let g_oSAPGUISession = oNull
  let g_oSAPGUI = oNull
EndFunction

/*
 * GuiSession
 */
 
object Function GetSAPGUISession ()
var
  object oSession

  if (!g_oSAPGUI) then
    GetSAPGUI ()
  endif

  let oSession = g_oSAPGUI.ActiveSession

  let g_oSAPGUISession = oSession

  ; ROM 2011/04/05 - experimal use of ComEvent "ProgressIndicator"
  ; attach event ProgressIndicator to session event if progress bar mode is "verbose" (1)
  if (!g_oSAPGUISession) then
    return oNull
  endif

  if (g_nProgressBarMode == 1) then
    ComAttachEvents (g_oSAPGUISession, "Sap")
  endif

  return oSession

EndFunction

int Function IsSAPGUISessionActive ()

  if (!g_oSAPGUISession) then
    return FALSE
  endif
  return TRUE

EndFunction

void Function ExitSAPGUISession ()

  if (g_oSAPGUISession && (g_nProgressBarMode == 1)) then
    ComDetachEvents (g_oSAPGUISession)
  endif

  let g_oSAPGUIFrame = oNull
  let g_oSAPGUISession = oNull
EndFunction

/*
 * ROM: 2009/10/20 - new function to check if session is currently busy; waits until session is free again
 */

int Function IsSAPGUISessionBusy (int nMaxTries, int bUsePauses)
var
  int i,
  int bBusy

  if (!g_oSAPGUISession) then
    return (FALSE)
  endif

  let i = nMaxTries
  let bBusy = g_oSAPGUISession.Busy
  while (bBusy && (i > 0))
    if (bUsePauses) then
      Pause ()
    endif
    let i = i - 1
    let bBusy = g_oSAPGUISession.Busy
  endwhile

  return (bBusy)

EndFunction

/*
 * GuiFrameWindow
 */
 
object Function GetSAPGUIFrame ()
var
  object oFrameWindow,
  object oSession

  /* DEBUG! */
  /*   if (!g_oSAPGUI) then
   *     GetSAPGUI ()
   *   endif
   *   let g_oSAPGUIFrame = g_oSAPGUI.children(0).children(0).children(0)
   *   if (true) then
   *     return
   *   endif
   */

  if (!g_oSAPGUISession) then
    GetSAPGUISession ()
  endif

  if (g_oSAPGUISession.Busy) then
    return (oNull)
  endif

  let oFrameWindow = g_oSAPGUISession.ActiveWindow
  let g_oSAPGUIFrame = oFrameWindow

  return oFrameWindow

EndFunction

int Function IsSAPGUIFrameActive ()

  if (!g_oSAPGUIFrame) then
    return FALSE
  endif
  return TRUE

EndFunction

void Function ExitSAPGUIFrame ()
  let g_oSAPGUIFrame = oNull
EndFunction

/*
 * GuiFocus object
 */

object Function GetSAPGUIFocus ()
var
  object oGuiFocus

  if (g_oSAPGUISession.Busy) then
    return (oNull)
  endif

  if (!g_oSAPGUIFrame) then
    GetSAPGUIFrame ()
  endif

  let oGuiFocus = g_oSAPGUIFrame.guiFocus

  return (oGuiFocus)

EndFunction

/*
 * GuiShell - OfficeIntegration
 */

void Function GuiShellOfficeIntegration (int nOIType, string sGuiShellSubType)
var
  string sConfig,
  string sWindowClass,
  string sMessage,
  string sMessageTutor

  let sConfig = ""
  let sMessage = ""
  let sMessageTutor = ""
  ; let nOIType = g_oGuiComponent.HostedApplication

  if (nOIType == GUI_OI_WORD) then
    let sMessage = msgWinword
    let sMessageTutor = msgTutorWinword
    let sConfig = sConfWinword
  elif (nOIType == GUI_OI_EXCEL) then
    let sMessage = msgExcel
    let sMessageTutor = msgTutorExcel
    let sConfig = sConfExcel
  elif (nOIType == GUI_OI_POWERPOINT) then
    let sMessage = msgPowerPoint
    let sMessageTutor = msgTutorPowerPoint
    let sConfig = sConfPowerpoint
  elif (nOIType == GUI_OI_PROJECT) then
    let sMessage = msgProject
    let sMessageTutor = msgTutorProject
    let sConfig = sConfProject
  elif (nOIType == GUI_OI_WORDPERFECT) then
    let sMessage = msgWordPerfect
    let sMessageTutor = msgTutorWordPerfect
    let sConfig = sConfWordperfect
  elif (nOIType == GUI_OI_ADOBE) then
    let sMessage = msgAdobeAcrobat
    let sMessageTutor = msgTutorAdobeAcrobat
    let sConfig = sConfAdobeAcrobat
  elif (nOIType == GUI_OI_UNKNOWN) then
    if (sGuiShellSubType == sGuiHtmlViewer) then
      Delay (2)
      let sWindowClass = GetWindowClass (GetFocus ())
      if (sWindowClass == sClassAcrobatReader) then
        let sMessage = msgAdobeAcrobat
        let sMessageTutor = msgTutorAdobeAcrobat
        let sConfig = sConfAdobeAcrobat
      else
        let sMessage = msgInternetExplorer
        let sMessageTutor = msgTutorInternetExplorer
        let sConfig = sConfInternetExplorer
        
      endif
    endif
  endif

  if (!StringIsBlank (sConfig) && !CompareStrings (sConfig, GetActiveConfiguration ())) then

    InvokeConfiguration (sConfig, sMessage, sMessageTutor)

  endif

  return

/*
  Currently not supported:
  ; GUI_OI_VISIO
  ; GUI_OI_WORDPRO
  ; GUI_OI_LOTUS123=7,
  ; GUI_OI_SAPOROS=9,
  ; GUI_OI_PSPLANNINGMODELLER=10,
*/

EndFunction

/*
 **********************************************************************
 ** Configurations
 **********************************************************************
*/

Void Function InvokeConfiguration (string sNextConfiguration, string sMessage, string sTutorMessage)

  let g_sNextConfiguration = sNextConfiguration

  if (g_nNextConfiguationID != 0) then
    UnscheduleFunction (g_nNextConfiguationID)
    let g_nNextConfiguationID = 0
  endif
  if (StringIsBlank (g_sNextConfiguration)) then
    return
  endif

  let g_sStartMessage = sMessage
  let g_sStartTutorMessage = sTutorMessage

  let g_nNextConfiguationID = ScheduleFunction ("StartConfiguration", StartTimeout)

EndFunction

Void Function StartConfiguration ()

  if (StringIsBlank (g_sNextConfiguration)) then
    return
  endif

  let g_sPreviousConfiguration = GetActiveConfiguration ()
  let g_nNextConfiguationID = 0

  if (CompareStrings (g_sPreviousConfiguration, sSapGuiConfiguration) == true) then
    if (!CompareStrings (g_sPreviousConfiguration, g_sNextConfiguration)) then
      /* StopSpeech () */
      /* SayCurrentGuiShell () */
      if (!StringIsBlank (g_sStartMessage)) then
        SayFormattedMessage (OT_CONTROL_TYPE, g_sStartMessage)
        if (!StringIsBlank (g_sStartTutorMessage)) then
          SayFormattedMessage (OT_TUTOR, g_sStartTutorMessage)
        endif
      endif
    endif
    ResetGuiComponent ()
    ExitSAPGUIFrame ()
    /*  Delay (2, FALSE)  */
  endif
 
SwitchToConfiguration (g_sNextConfiguration)

;To set the mode to Virtual PC cursor mode in the configuration file for IE when in an HTML container (LNB)
/* 2016/02/01 (rom) : deleted obsolete code */

EndFunction

Void Function SapSwitchBackConfiguration ()
var
  int bFound,
  int iSubType,
  int nGuiComponentType,
  handle hAppWindow,
  handle hFocus,
  handle hRun,
  object oFocus,
  string sCurConfig,
  string sGuiComponentSubType,
  string sWindowClass

  let hFocus = GetFocus ()
  let hAppWindow = GetAppMainWindow (hFocus)

  let sCurConfig = GetActiveConfiguration ()
  if (CompareStrings (sCurConfig, sSapGuiConfiguration)) then
    return
  endif

  let sWindowClass = GetWindowClass (hAppWindow)

  /* check for SAPGUI running inplace in IE */
  if (CompareStrings (sWindowClass, sClassIEFrame)) then
    if (!CompareStrings (sCurConfig, sConfInternetExplorer)) then
      return
    endif

    let bFound = FALSE
    let hRun = hFocus
    while (!bFound)
      let hRun = GetParent (hRun)
      if ((!hRun) || (hRun == hAppWindow)) then
        return
      endif
      let sWindowClass = GetWindowClass (hRun)
      let bFound = (CompareStrings (sWindowClass, sClassSapFrontend))
    endwhile

    GetSAPGUIFrame ()
    if (!g_oSAPGUIFrame) then
      /* SayString ("no SAPGUI frame window") */
      return
    endif
    
    if (g_oSAPGUIFrame.handle == hRun) then
      InvokeConfiguration (sSapGuiConfiguration, "", "")
    endif

    ExitSAPGUI ()
    return
  endif

  /*
   * ROM 2012/11/02
   * Checking for SAP dialog box and performance assistance classes seem to be obsolete, because the standard Win dialog box class "#32770"
   * is also used by SAPGUI. Therefore, we rely on SAPGUI scripting ActiveSession/ActiveWindow and  GuiFocus returnig null whenever
   * no SAPGUI element is active
   */
 
  if (g_oSAPGUISession.Busy) then
    ExitSAPGUIFrame ()
    return
  endif

  GetSAPGUIFrame ()
  if (!g_oSAPGUIFrame) then
    return
  endif

  let oFocus = GetSAPGUIFocus ()
  if (!oFocus) then
    ExitSAPGUIFrame ()
    return
  endif 

  let nGuiComponentType = oFocus.typeAsNumber

  if (nGuiComponentType == GUI_TC_GUISHELL) then
    let sGuiComponentSubType = oFocus.SubType
    if (sGuiComponentSubType == sGuiOfficeIntegration) then
      let iSubType = g_oGuiComponent.HostedApplication
      GuiShellOfficeIntegration (iSubType, sGuiOfficeIntegration)
    elif (sGuiComponentSubType == sGuiHtmlViewer) then
      let iSubType = GUI_OI_UNKNOWN
      GuiShellOfficeIntegration (iSubType, sGuiHtmlViewer)
    else
      let oFocus = oNull
      ExitSAPGUIFrame ()
      StopSpeech ()
      InvokeConfiguration (sSapGuiConfiguration, "", "")
    endif
  else
    let oFocus = oNull
    ExitSAPGUIFrame ()
    StopSpeech ()
    InvokeConfiguration (sSapGuiConfiguration, "", "")
  endif

  let oFocus = oNull
  ExitSAPGUIFrame ()

EndFunction

/*
 **********************************************************************
 ** Event functions
 **********************************************************************
*/
 
Script SapFocusChanged ()

  SapSwitchBackConfiguration ()

EndScript

Script SapEndRequest ()

  let g_sProgressBarText = ""
  let g_sProgressBarPreviousText = ""
  ; Say ("saputils end request", OT_JAWS_MESSAGE)

EndScript

/*
 * ROM 2011/04/05 - following event is triggered by ComEvent "ProgressIndicator" - this COM event will get fired to 
 * indicate updates to the progress bar;
 * alternatively, the script function "ProgressIndicator" can be used, which is invoked by SAPGUI via JfwRunScript
 */

void Function SapProgressIndicator (int nPercentage, string sText)
var
  int nElapsed

  if (g_nProgressBarMode != 1) then
    return
  endif

  if (nPercentage <= g_nProgressBarPercentage) then
    let g_sProgressBarPreviousText = ""
  endif
  let g_nProgressBarPercentage = nPercentage
  let g_sProgressBarText = sText

  let nElapsed = (GetTickCount () - g_nProgressBarLastChange)
  if (nElapsed < 2500) then
    return
  endif

  let g_nProgressBarLastChange = GetTickCount ()

  ScheduleFunction ("AnnounceProgressIndicator", 1)

EndFunction

script ProgressIndicator ()

  if (g_nProgressBarMode != 0) then
    return
  endif

  if (!g_oSAPGUISession) then
    return
  endif

  ScheduleFunction ("AnnounceProgressIndicator", 1)

EndScript

/*
 * helper function to announce progress indicator
 */

void Function AnnounceProgressIndicator ()
var
  int nPercentage,
  int nElapsed,
  string sAnnouncement

  if (!StringIsBlank (g_sProgressBarSound)) then
    PlaySound (g_sProgressBarSound)
  endif

  let sAnnouncement = ""

  if (!g_nProgressBarMode) then
    let nElapsed = (GetTickCount () - g_nProgressBarLastChange)
    if (nElapsed < 2500) then
      return
    endif
    let g_nProgressBarLastChange = GetTickCount ()

    if (!g_oSAPGUISession) then
      return
    endif

    let nPercentage = g_oSAPGUISession.ProgressPercent
    if (nPercentage <= g_nProgressBarPercentage) then
      let g_sProgressBarPreviousText = ""
    endif
    let g_nProgressBarPercentage = nPercentage
    let g_sProgressBarText = g_oSAPGUISession.ProgressText

  endif

  if (StringCompare (g_sProgressBarText, g_sProgressBarPreviousText, true) != 0) then
    let sAnnouncement = g_sProgressBarText
    let g_sProgressBarPreviousText = g_sProgressBarText
  endif

  let sAnnouncement = sAnnouncement + " " + IntToString (g_nProgressBarPercentage) + " %"
  Say (sAnnouncement, OT_JAWS_MESSAGE)

EndFunction

/*
 * Reset and set focus to ok code field
 */

Script SapExitToOCF ()
var
  object oSAPGUI,
  object oOCF,
  string sCurConfig

  ExitSAPGUI ()
  Delay (1, TRUE)

  GetSAPGUIFrame ()
  if (!g_oSAPGUIFrame) then
    SayCurrentScriptKeyLabel ()
    TypeCurrentScriptKey ()
    return
  endif

  if (g_oSAPGUIFrame.handle != GetAppMainWindow (GetFocus ())) then
    SayCurrentScriptKeyLabel ()
    TypeCurrentScriptKey ()
    ExitSAPGUIFrame ()
    return
  endif

  let oOCF = g_oSAPGUIFrame.findByName (sSapGuiOkCodeFieldName, sSapGuiOkCodeFieldType)
  if (!oOCF) then
    SayCurrentScriptKeyLabel ()
    TypeCurrentScriptKey ()
    ExitSAPGUIFrame ()
    return
  endif

  ; SayString ("okay code field jump")

  oOCF.SetFocus ()

  Refresh (1)
  Delay (2)

  ExitSAPGUIFrame ()

  let sCurConfig = GetActiveConfiguration ()
  if (sCurConfig != sSapGuiConfiguration) then
    ; SayString ("Debug Switch to Sapfront configuration")
    InvokeConfiguration (sSapGuiConfiguration, "", "")
  endif

EndScript

void Function Unknown (string TheName)
  ; do nothing
  return
EndFunction
