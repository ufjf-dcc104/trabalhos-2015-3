function montaMapa (mapa)
{
	for (var l = 0; l < 10; l++) 
	{
		mapa[l] = [];
		for (var c = 0; c < 20; c++)
		{
			mapa[l][c] = 0;
			// Chao
			if (l == 9)
			{ 
				if (c > 2 && c < 9)
					mapa[l][c] = 2;
				else
					mapa[l][c] = 1;
			}
			else if (l == 8)
			{
				if (c > 8 || c < 3)
					mapa[l][c] = 1;
				else
					mapa[l][c] = 0;
			}
			else
			{
				if (l != 7)
				{
					if (c > 9)
					{
						if ((c == 12)||(c == 15)||(c == 18))
							mapa[l][c] = 0;
						else
							mapa[l][c] = 1;
					}
					else
						mapa[l][c] = 0;
				}
				else
				{
					if (c == 19)
						mapa[l][c] = 3;
					else
						mapa[l][c] = 0;
				}
			}
		}
	}
}

function desenharMapa(mapa,f)
	{
		for (var l = 0; l < 10; l++) 
		{
			for (var c = 0; c < 20; c++)
			{
				if(mapa[l][c]==1)
					ctx.drawImage(mapa.img[0], 32,32,30,30,c*30, l*30, 30, 30);
				else if (mapa[l][c] == 2)
					ctx.drawImage(mapa.img[1], 30,30,50,50,c*30, l*30, 30, 30);
				else if (mapa[l][c] == 3)
				{
					f += 8*dt;
					if (f >= 10) f = 1;
					ctx.drawImage(mapa.img[3],Math.floor(f)*50,0,50,50,c*30,l*30,30,30);
				}
			}
		}
		return (f);	
	}
