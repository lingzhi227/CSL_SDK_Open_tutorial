This tutorial is to share experiences in programming the CS2 using CSL language.

All of which has already listed in sdk website: https://sdk.cerebras.net/

Our tutorial is only to clarify things on this website. Instead of disclose too much unnecessary information.

Some main parts of this tutorial:

1. basic hardware features manipulation

2. strange data transfer patterns exercise

3. local PE task schedulaing

4. ...

5. local communication patterns

6. applications




# Project programs
  ## pe_program.csl

  ### [Builtins](https://sdk.cerebras.net/csl/language/builtins)  

  @as: casts idx from i16 to f32  
  [case @as(f32, idx)](./0/code.csl#L12)  

  [@constants](https://sdk.cerebras.net/csl/language/builtins?highlight=constants#constants)

  [Builtins for Remote Procedure Calls](https://sdk.cerebras.net/csl/language/builtins?highlight=remote%20procedure%20calls#language-builtins-rpc)  
  [case @rpc](./1/pe_program.csl#L53)  

  [@export_name](https://sdk.cerebras.net/csl/language/builtins?highlight=export_name#export-name)

  ### [Data Structure Descriptors](https://sdk.cerebras.net/csl/language/dsds#language-dsds)

  [@get_dsd](https://sdk.cerebras.net/csl/language/dsds#basic-syntax)

  [@fmacs](https://sdk.cerebras.net/csl/language/builtins?highlight=fadds#fmacs): 32-bit floating point multiply-add  
  @fmacs(dest_dsd, src_dsd1, src_dsd2, f32_value);

  [@fadds](https://sdk.cerebras.net/csl/language/builtins?highlight=fadds#fadds)

  [@fmovs]()

  [@increment_dsd_offset](https://sdk.cerebras.net/csl/language/dsds#increment-dsd-offset)

  [SIMD mode](https://sdk.cerebras.net/csl/language/appendix#language-appendix-simd)

  ## layout.csl

  [@get_color](https://sdk.cerebras.net/csl/language/builtins#get-color)  
    [case @get_color](./1/layout.csl#L1)  

  [@import_module](https://sdk.cerebras.net/csl/language/builtins?highlight=import_module#import-module)

  [memcpy](https://sdk.cerebras.net/csl/tutorials/gemv-01-complete-program/device-code.html)  

  [@set_rectangle]()  

  [@set_tile_code]()  

  [@set_color_config]()  

  ## py file

  ### [sdk_runtime_api](https://sdk.cerebras.net/api-docs/sdkruntime-api.html)

  ROI = region of interest

  [memcpy_d2h](https://sdk.cerebras.net/api-docs/sdkruntime-api.html?highlight=memcpy_d2h#cerebras.sdk.runtime.sdkruntimepybind.SdkRuntime.memcpy_d2h) 

  [memcpy_h2d](https://sdk.cerebras.net/api-docs/sdkruntime-api.html?highlight=memcpy_h2d#cerebras.sdk.runtime.sdkruntimepybind.SdkRuntime.memcpy_h2d)

  ## sh file
  set -e  
  set -e 命令的作用是当脚本中的任何命令返回非零状态码时（即命令失败），立即退出脚本。它用于确保脚本在遇到错误时不会继续执行，从而避免潜在的错误传播和未定义行为。

  [get_color buildin](https://sdk.cerebras.net/csl/language/builtins?highlight=get_color#get-color)

  [@get_dsd](https://sdk.cerebras.net/csl/language/builtins?highlight=get_dsd)

  [@fadds(dest_dsd,    src_dsd1,  src_dsd2)](https://sdk.cerebras.net/csl/language/builtins?highlight=@fadds)
  @fadds(dest_dsd,    src_dsd1,  f32_value);
  @fadds(f32_pointer, f32_value, src_dsd1);

@concat_structs(this_struct, another_struct);

https://sdk.cerebras.net/csl/language/builtins?highlight=concat_structs#concat-structs





# SDK Tutorials

  ## 01
  ### host
  - import runtime, memcpydatatype, memcpyorder
  - read arguments, sh file gives the arguments param
  - construct matrix
  - calculate expected result
  - runner.load(), runner.run()
  - launch init_and_compute function on device

  ### device

  [layout]
  - @get_color
  - @import_module
  - @set_rectangle
  - @set_tile_code
  - @export_name

  [pe]
  - param memcpy_params: comptime_struct;
  - @import_module
  - Call initialize and gemv functions
  - Initialize matrix and vectors
  - Compute gemv
  - sys_mod.unblock_cmd_stream();
  - @export_symbol
  - Create RPC server @rpc

  ### host
  - copy result back to host
      - memcpy_d2h
  - runner.stop()

  ## 02 Memory DSDs
  - get_dsd

  ## 03 Memcpy
  - Copy data from host to device using SdkRuntime’s memcpy_h2d function
  Steps:
  1. py code
      1. Host-to-device memcpy of A, x, and b
      2. Kernel launch
  2. csl code
  3. py code
      1. Device-to-host memcpy of y

  ## 04 Parameters
  - Define compile time parameters for your device code
  - Set the value of compile time parameters when compiling
  - Read the value of compile time parameters from compile output in your host code

  layout.csl



  ## 05 Multiple PEs
  - Define a layout file that compiles code for multiple PEs
  - Copy data to and from multiple PEs on the device



  ## 06 Routes and Fabric DSDs I

  - Use fabric DSDs fabout_dsd and fabin_dsd to send and receive data between PEs
  - Utilize asynchronous builtin operations on fabric DSDs
  - Define a local task which is activated by a local_task_id



  ## 07 Routes and Fabric DSDs II
    - break up a single GEMV computation among a 2 x 2 square of PEs.

  ## 08 Routes and Fabric DSDs III GEMV with Checkerboard Pattern
  - extend the GEMV computation to a kernel_x_dim x kernel_y_dim rectangle of PEs. We make one simplification, enforcing that M is a multiple of kernel_y_dim, and N is a multiple of kernel_x_dim.

  ## 09 Memcpy Streaming Mode
  - use the streaming mode of memcpy to stream x and b onto the device, and stream y off of the device.


  ## Topic 1: Arrays and Pointers
  - This example demonstrates a function incrementAndSum(), which accepts a pointer to an array and a pointer to a scalar.
  ## Topic 2: Streaming Wavelet Data

  ## Topic 3: Wavelets for Sparse Tensors

  ## Topic 4: Sentinels

  ## Topic 5: Switches
  - Switches can be helpful not just to change the routing configuration in limited ways at runtime, but also to save the number of colors used. For instance, this same example could be re-written to use four colors and four routes, but by using fabric switches, this example uses just one color.
  ## Topic 6: Libraries

  ## Topic 7: Filters

  ## Topic 8: FIFOs

  ## Topic 9: @map Builtin

  ## Topic 10: Collective Communications

  ## Topic 11: Debug Library

  ## Pipeline 1: Redirect fabin to fabout

  ## Pipeline 2: Attach a FIFO to H2D

  ## Pipeline 3: Add an artificial halo