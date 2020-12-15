all: main.pdf

main.pdf: *.tex
	xelatex -interaction=nonstop -synctex=1 main.tex

clean:
	rm *.aux *.log *.pdf *.err *.toc *.gz
