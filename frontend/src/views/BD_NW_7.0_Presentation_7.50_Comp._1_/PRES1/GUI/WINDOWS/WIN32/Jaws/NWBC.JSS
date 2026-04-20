
/*
 * JAWS Script file for SAPGUI.
 *
 * Copyright
 *   SAP AG, www.sap.com
 *   Last Update : 2016/01/18 - for Screen Reader Extensions 2.53 (xSRX 43)
 */


include "hjConst.jsh"
include "hjGlobal.jsh"
include "common.jsm"

include "sapglobal.jsh"

void function FocusChangedEvent (handle hPrevWnd, handle hFocusWnd)
var
  int bFound,
  int nLevel,
  handle hAppWindow,
  handle hTopLevelWindow,
  handle hFocus,
  handle hRun,
  handle hFound,
  string sWindowClass

  FocusChangedEvent (hPrevWnd, hFocusWnd)

  hFocus = GetFocus ()
  hTopLevelWindow = GetTopLevelWindow (hFocus)
  hAppWindow = GetAppMainWindow (hFocus)

  if ((hTopLevelWindow != hAppWindow) && (GetWindowClass (hTopLevelWindow) == cWc_dlg32770)) then
    nLevel = 0
    while ((GetWindowClass (hAppWindow) == cWc_dlg32770) && (nLevel < 10))
      hAppWindow = GetAppMainWindow (hAppWindow)
      nLevel = nLevel + 1
    endwhile
    hFound = FindWindow (hAppWindow, sClassSapEmbeddedFrontend)
    if (hFound) then
      SwitchToConfiguration (sSapGuiConfiguration)
      return
    endif
  endif

  sWindowClass = GetWindowClass (hFocus)
  bFound = FALSE
  hRun = hFocus
  while (hRun && !bFound)
    sWindowClass = GetWindowClass (hRun)
    bFound = (CompareStrings (sWindowClass, sClassSapEmbeddedFrontend))
    hRun = GetParent (hRun)
  endwhile

  if (bFound) then
    SwitchToConfiguration (sSapGuiConfiguration)
  endif

endFunction
