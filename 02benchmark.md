# How to Use the [`sweep.py`](https://sdk.cerebras.net/csl/code-examples/benchmark-single-tile-matvec#sweep-py) File

The `sweep.py` file is used to automate the generation and execution of benchmarking tasks under different configurations. By changing certain parameters (e.g., `tile_size`), it helps you perform tests on matrix-vector multiplication (matvec) operations under various conditions and evaluate their performance. The core function of this file is **parameter sweeping**, meaning it varies specific parameters within a defined range, generates the corresponding executable files, and runs them on the **Cerebras** hardware.

## 1. Running `sweep.py` from the Command Line
You can run `sweep.py` directly in your terminal and control its execution by passing different command-line arguments. Below is the basic command format:

```bash
./sweep.py --name <name> --cmaddr <IP:port> --dims <W,H> --iters <iters>
```

## 2. Command Line Arguments Explained
`sweep.py` provides several command-line arguments to control the benchmarking process. You can specify parameters like matrix size, hardware address, etc.

- `--name` (default: `"out"`):
  - **Description**: Prefix for the output file name, which will be used for naming the generated ELF files.
  - **Usage**: This helps in distinguishing different ELF files, especially when performing multiple benchmarks with different configurations.

- `--cmaddr`:
  - **Description**: The IP and port of the Cerebras system used to connect and submit tasks.
  - **Format**: `IP:port` (e.g., `"192.168.1.1:5000"`).
  - **Usage**: This parameter is required to ensure the task is submitted to the correct Cerebras hardware node for execution.

- `--dims`:
  - **Description**: Width and height of the matrix, specifying the grid dimensions for the computational task.
  - **Format**: `<W>,<H>`, e.g., `"2,3"`, where the width is 2 and the height is 3.
  - **Usage**: Different `dims` allow you to vary the size of the matrix, helping to understand performance under different matrix sizes.

- `--iters` (default: `1`):
  - **Description**: Number of iterations for each matrix-vector multiplication.
  - **Usage**: Specifies how many times the computation should run, which helps in testing stability and performance during repeated execution.

## 3. Steps to Run `sweep.py`
Below is an example process, assuming you want to test different configurations of `tile_size` with a matrix size of width `4` and height `3`, connected to the Cerebras machine at address `192.168.1.1:5000`, and using the prefix "test" for the output files.

```bash
./sweep.py --name test --cmaddr 192.168.1.1:5000 --dims 4,3 --iters 5
```

This command will execute the following steps:
1. **Parse Arguments**: `name` is set to `"test"`, `cmaddr` to `"192.168.1.1:5000"`, `dims` to width `4` and height `3`, and `iters` to `5`.
2. **Parameter Sweep**: The script will sweep through different `tile_size` values (from 10 to 100, in steps of 10).
3. **Compile and Execute**: For each `tile_size`, `layout_matvec.csl` is compiled, generating an ELF file named `"test_<tile_size>"`, which is then submitted to the Cerebras system for execution.
4. **Post-Run Verification**: After running the tasks, `run.py` is invoked to execute these tasks.

## 4. Summary of Code Mechanism
The purpose of `sweep.py` can be summarized as follows:
- **Automated Configuration Generation**: It generates multiple task configurations by varying `tile_size`.
- **Compile Tasks**: Each configuration calls `cslc` for compilation, generating the corresponding ELF file.
- **Execute Tasks**: Each ELF file is then submitted to the specified Cerebras machine for execution, controlled via `cs_python` and `run.py`.
- **Iterative Execution**: Through the loop that varies `tile_size`, users can test multiple configurations in a single run without needing to compile and execute each one manually.

## Example Usage Scenario
Suppose you want to evaluate how different matrix block sizes affect system performance. You can use `sweep.py` to:
- Set specific matrix dimensions and iteration count.
- Vary `tile_size` to generate multiple benchmark tasks and execute them.
- Finally, check the output results (e.g., runtime, FLOPS, bandwidth) to evaluate which `tile_size` works best for your hardware resources and application needs.

## Conclusion
- `sweep.py` is used for **benchmarking matrix-vector multiplication** by generating ELF files with different parameter configurations and running them on the **Cerebras** system.
- It helps you understand which parameter combinations perform best on the hardware, maximizing efficiency.
- The ELF files and results from multiple tests provide insight into the optimal performance configuration, making it an essential tool for tuning tasks to achieve peak performance on Cerebras hardware.

This type of automated benchmarking greatly improves efficiency when debugging and optimizing large-scale system tasks, particularly on powerful parallel hardware like Cerebras. It helps identify performance bottlenecks and optimal configurations by testing a wide range of parameters systematically.

