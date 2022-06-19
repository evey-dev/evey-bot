function applyText(canvas, text, offset, font, originalSize) {
    const ctx = canvas.getContext('2d');
    let fontSize = originalSize;
    do {
        ctx.font = `${fontSize -= 2}px ${font}`;
    } while (ctx.measureText(text).width > canvas.width - offset);

    return ctx.font;
};

function circle(ctx, x, y, r, sa, ea, counter) {
    ctx.beginPath();
    ctx.arc(x, y, r, sa, ea, counter);
    ctx.closePath();
};

function wrapText(ctx, text, x, y, maxWidth, lineHeight, outline) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
        if (outline == true) {
            ctx.strokeStyle = '#ffffff'
            ctx.strokeText(line, x, y);
            ctx.strokeStyle = '#000000'
        }
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
        }
        else {
        line = testLine;
        }
    }
    if (outline == true) {
        ctx.strokeStyle = '#ffffff'
        ctx.strokeText(line, x, y);
        ctx.strokeStyle = '#000000'
    }
    ctx.fillText(line, x, y);
};

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fill();
};

function roundedRect2(ctx, x, y, width, height, radius) {
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
};

module.exports = {
	applyText, roundedRect, circle, roundedRect2, wrapText
}