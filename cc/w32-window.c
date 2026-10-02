#include <SDKDDKVer.h>
#define UNICODE
#define NOMINMAX
#define VC_EXTRALEAN
#define WIN32_LEAN_AND_MEAN
#include <Windows.h>

#define APP_WIDTH 640
#define APP_HEIGHT 360
#define APP_TITLE L"NN Simple Window"
#define APP_CLASS_NAME L"NN CLASS NAME"

LRESULT CALLBACK handlerMessage(HWND wnd, UINT msg, WPARAM wpm, LPARAM lpm) {
  switch (msg) {
    case WM_DESTROY:
      PostQuitMessage(0);
      break;

    default:
      return DefWindowProcW(wnd, msg, wpm, lpm);
  }
  return 0;
}

int main() {
  HMODULE instance = GetModuleHandleW(NULL);

  WNDCLASSEXW wc = {
    .cbSize        = sizeof(wc),
    .style         = CS_HREDRAW | CS_VREDRAW,
    .lpfnWndProc   = handlerMessage,
    .cbClsExtra    = 0,
    .cbWndExtra    = sizeof(void*),
    .hInstance     = instance,
    .hIcon         = LoadIcon(instance, IDI_APPLICATION),
    .hCursor       = LoadCursor(NULL, IDC_ARROW),
    .hbrBackground = (HBRUSH)(COLOR_WINDOW + 1),
    .lpszMenuName  = NULL,
    .lpszClassName = APP_CLASS_NAME,
    .hIconSm       = LoadIcon(instance, IDI_APPLICATION),
  };
  if (!RegisterClassExW(&wc))
    return GetLastError();

  HWND window = CreateWindowExW(
    0,
    APP_CLASS_NAME, APP_TITLE,
    WS_OVERLAPPEDWINDOW,
    CW_USEDEFAULT, CW_USEDEFAULT,
    APP_WIDTH, APP_HEIGHT,
    NULL, NULL, instance, NULL
  );
  if (!window)
    return GetLastError();

  ShowWindow(window, SW_SHOW);

  MSG msg;
  while (GetMessageW(&msg, NULL, 0, 0)) {
    TranslateMessage(&msg);
    DispatchMessageW(&msg);
  }

  UnregisterClassW(wc.lpszClassName, wc.hInstance);
  DestroyWindow(window);
  return msg.wParam;
}
