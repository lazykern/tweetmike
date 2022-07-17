#include <stdio.h>
#include <stdlib.h>

char maze[101][101];
int path[101][101];
int res[10010];
int start_x, start_y, goal_x, goal_y;
int n;

void traverseMaze(int x, int y, int k)
{
    int i, j;

    res[k] = x * n + y;
    path[x][y] = 1;

    if (maze[x][y] == 'G')
    {
        for (i = 1; i < k; ++i)
        {
            int tx = res[i] / n;
            int ty = res[i] % n;
            maze[tx][ty] = '.';
        }
    }

    for (i = -1; i <= 1; ++i)
    {
        for (j = -1; j <= 1; ++j)
        {
            if (abs(i + j) == 1 && x + i < n && x + i >= 0 && y + j < n && y + j >= 0 && maze[x + i][y + j] != '#' && path[x + i][y + j] == 0)
            {
                traverseMaze(x + i, y + j, k + 1);
            }
        }
    }
}

int main(int argc, char const *argv[])
{
    int i, j;

    scanf("%d", &n);
    char tmp[10];

    fgets(tmp, n + 2, stdin);

    for (i = 0; i < n; ++i)
    {
        fgets(maze[i], n + 2, stdin);
    }

    start_x = -1, start_y = -1, goal_x = -1, goal_y = -1;

    for (i = 0; i < n; ++i)
    {
        for (j = 0; j < n; ++j)
        {
            if (start_x == -1 && start_y == -1 && maze[i][j] == 'S')
            {
                start_x = i;
                start_y = j;
            } else if (goal_x == -1 && goal_y == -1 && maze[i][j] == 'G')
            {
                goal_x = i;
                goal_y = j;
            }

            if (start_x != -1 && goal_x != -1)
            {
                break;
            }
        }
        if (start_x != -1 && goal_x != -1)
        {
            break;
        }
    }
    traverseMaze(start_x, start_y, 0);
    for (i = 0; i < n; ++i)
    {
        for (j = 0; j < n; ++j)
        {
            printf("%c", maze[i][j]);
        }
        printf("\n");
    }
}
